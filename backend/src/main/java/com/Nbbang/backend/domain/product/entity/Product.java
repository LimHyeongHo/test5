package com.Nbbang.backend.domain.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter @Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    // 💡 로그인 담당 팀원이 User 엔티티를 만들 때까지 임시로 Long 타입을 사용합니다.
    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

    @Column(nullable = false)
    private String title;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;

    @Column(name = "discount_price", nullable = false)
    private BigDecimal discountPrice;

    @Column(name = "target_qty", nullable = false)
    private Integer targetQty;

    @Column(nullable = false)
    private LocalDateTime deadline;

    @Column(nullable = false, length = 50)
    private String status = "OPEN"; // 기본값으로 'OPEN'(모집중) 설정

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 데이터가 처음 저장될 때 시간 자동 기록
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // 데이터가 수정될 때 시간 자동 갱신
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}