package com.Nbbang.backend.domain.payment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Getter @Setter
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false, unique = true)
    private String orderId; // Toss 결제 건을 식별하는 키 (prepare 단계에서 발급)

    @Column(name = "payment_key")
    private String paymentKey; // Toss가 결제 승인 시 내려주는 키 (승인 전엔 null)

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "buyer_name", nullable = false)
    private String buyerName;

    @Column(nullable = false)
    private Long amount; // 서버가 상품 가격 기준으로 계산한 금액 (클라이언트 값 신뢰하지 않음)

    @Column(nullable = false, length = 20)
    private String status = "PENDING"; // PENDING -> DONE 또는 FAILED

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt; // Toss 승인 확정 시각

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }
}
