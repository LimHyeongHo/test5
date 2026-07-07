package com.Nbbang.backend.domain.product.controller; // 🚨 본인 경로에 맞게 수정

import com.Nbbang.backend.domain.product.entity.Product;
import com.Nbbang.backend.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") 
public class ProductController {

    private final ProductService productService; // 💡 레포지토리 대신 서비스로 변경!

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @ModelAttribute Product product,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        // 프론트엔드에서 FormData로 전송하므로 @ModelAttribute로 매핑하고 이미지는 별도로 받습니다.
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
}