package com.Nbbang.backend.domain.product.service; // 🚨 본인 경로에 맞게 수정

import com.Nbbang.backend.domain.product.entity.Product;
import com.Nbbang.backend.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    // 상품 등록 로직 (DB에 저장하기 전에 검사하거나 가공할 내용이 있다면 여기서 처리)
    @Transactional
    public Product createProduct(Product product) {
        if (product.getSellerId() == null) {
            product.setSellerId(1L); // 임시 유저 세팅
        }
        return productRepository.save(product);
    }

    // 전체 상품 조회 로직
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}