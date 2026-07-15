package com.Nbbang.backend.domain.payment.service;

import com.Nbbang.backend.domain.payment.dto.PaymentPrepareRequest;
import com.Nbbang.backend.domain.payment.dto.PaymentPrepareResponse;
import com.Nbbang.backend.domain.payment.dto.PaymentRequest;
import com.Nbbang.backend.domain.payment.dto.PaymentResponse;
import com.Nbbang.backend.domain.payment.entity.Payment;
import com.Nbbang.backend.domain.payment.repository.PaymentRepository;
import com.Nbbang.backend.domain.product.entity.Product;
import com.Nbbang.backend.domain.product.repository.ProductRepository;
import com.Nbbang.backend.domain.product.service.ProductService;
import com.Nbbang.backend.global.exception.CustomException;
import com.Nbbang.backend.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ProductRepository productRepository;
    private final PaymentRepository paymentRepository;
    private final ProductService productService;

    @Value("${toss.secret-key}")
    private String secretKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.tosspayments.com")
            .build();

    // 결제 준비: 결제창을 열기 전에 서버가 실제 상품 가격을 확인하고 PENDING 상태로 기록해둔다.
    public PaymentPrepareResponse prepare(PaymentPrepareRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (product.getCurrentCount() != null && product.getCurrentCount() >= product.getTargetCount()) {
            throw new CustomException(ErrorCode.PURCHASE_FULL);
        }

        Long amount = product.getPrice().longValue();
        String orderId = "order_" + UUID.randomUUID().toString().replace("-", "");

        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setProductId(product.getProductId());
        payment.setBuyerName(request.getBuyerName());
        payment.setAmount(amount);
        payment.setStatus("PENDING");
        paymentRepository.save(payment);

        return new PaymentPrepareResponse(orderId, amount);
    }

    public PaymentResponse confirmPayment(PaymentRequest request) {
        // TODO: global/exception 병합 후 CustomException으로 교체
        if (request.getAmount() == null || request.getAmount() <= 0) {
            throw new RuntimeException("결제 금액이 올바르지 않습니다");
        }

        String encodedKey = Base64.getEncoder()
                .encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8));

        Map<String, Object> body = new HashMap<>();
        body.put("paymentKey", request.getPaymentKey());
        body.put("orderId", request.getOrderId());
        body.put("amount", request.getAmount());

        try {
            return webClient.post()
                    .uri("/v1/payments/confirm")
                    .header("Authorization", "Basic " + encodedKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(PaymentResponse.class)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("결제 서버와 통신에 실패했습니다. 잠시 후 다시 시도해주세요");
        } catch (Exception e) {
            throw new RuntimeException("결제 승인에 실패했습니다. 잠시 후 다시 시도해주세요");
        }
    }

    // Toss 리다이렉트 콜백 처리: PENDING 조회 -> 금액 대조 -> 승인 확정 -> 참여 확정까지 한 번에 묶는다.
    @Transactional
    public PaymentResponse processSuccessCallback(String orderId, String paymentKey, Long amount) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("유효하지 않은 주문입니다"));

        if ("DONE".equals(payment.getStatus())) {
            // 이미 처리된 콜백(중복 리다이렉트 등) - 재처리하지 않고 그대로 성공 응답
            PaymentResponse response = new PaymentResponse();
            response.setPaymentKey(payment.getPaymentKey());
            response.setOrderId(payment.getOrderId());
            response.setTotalAmount(payment.getAmount());
            response.setStatus("DONE");
            return response;
        }

        if (!payment.getAmount().equals(amount)) {
            throw new RuntimeException("결제 금액이 일치하지 않습니다");
        }

        PaymentRequest request = new PaymentRequest();
        request.setPaymentKey(paymentKey);
        request.setOrderId(orderId);
        request.setAmount(amount);
        PaymentResponse result = confirmPayment(request);

        finalizeSuccessfulPayment(payment, result);

        return result;
    }

    // 결제 확정을 참여 확정으로 연결: Payment를 DONE으로 갱신하고 참여 인원/기록을 반영한다.
    @Transactional
    public void finalizeSuccessfulPayment(Payment payment, PaymentResponse tossResponse) {
        payment.setPaymentKey(tossResponse.getPaymentKey());
        payment.setStatus("DONE");
        payment.setApprovedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        productService.joinProduct(payment.getProductId(), payment.getBuyerName());
    }
}
