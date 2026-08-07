package com.Nbbang.backend.domain.product.controller; // 🚨 본인 경로에 맞게 수정

import com.Nbbang.backend.domain.product.entity.Participation;
import com.Nbbang.backend.domain.product.entity.Product;
import com.Nbbang.backend.domain.product.service.ProductService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService; // 💡 레포지토리 대신 서비스로 변경!

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @ModelAttribute Product product,
            @RequestParam(value = "image", required = false) MultipartFile image,
            HttpSession session) {
        // 프론트엔드에서 FormData로 전송하므로 @ModelAttribute로 매핑하고 이미지는 별도로 받습니다.
        // [신규] POST /api/chat/rooms 호출용 판매자 이메일 세팅
        product.setSellerEmail((String) session.getAttribute("userId"));
        Product savedProduct = productService.createProduct(product, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<Product> joinProduct(@PathVariable Long id, @RequestBody(required = false) Map<String, String> request) {
        String buyerName = (request != null && request.containsKey("buyerName")) ? request.get("buyerName") : "익명 구매자";
        Product product = productService.joinProduct(id, buyerName);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Product> cancelJoinProduct(@PathVariable Long id) {
        Product product = productService.cancelJoinProduct(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySellerId(@PathVariable Long sellerId) {
        List<Product> products = productService.getProductsBySellerId(sellerId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/seller/{sellerId}/participations")
    public ResponseEntity<List<Map<String, Object>>> getParticipationsBySellerId(@PathVariable Long sellerId) {
        List<Participation> participations = productService.getParticipationsBySellerId(sellerId);
        List<Map<String, Object>> response = participations.stream().map(part ->
            Map.of(
                "id", part.getId(),
                "buyerName", part.getBuyerName(),
                "joinDate", part.getJoinDate(),
                "product", Map.of("title", part.getProduct().getTitle())
            )
        ).toList();
        return ResponseEntity.ok(response);
    }
}
