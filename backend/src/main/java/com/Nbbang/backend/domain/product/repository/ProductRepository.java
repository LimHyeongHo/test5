package com.Nbbang.backend.domain.product.repository;

import com.Nbbang.backend.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerIdOrderByCreatedAtDesc(Long sellerId);
    // 기본 크루드(저장, 조회, 수정, 삭제) 메서드가 자동으로 제공됩니다.
}