package com.Nbbang.backend.domain.product.service; // 🚨 본인 경로에 맞게 수정

import com.Nbbang.backend.domain.product.entity.Product;
import com.Nbbang.backend.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    // 로컬 업로드 경로 설정 (프로젝트 실행 위치의 uploads 폴더)
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    // 상품 등록 로직 (이미지 파일 로컬 저장 포함)
    @Transactional
    public Product createProduct(Product product, MultipartFile image) {
        if (product.getSellerId() == null) {
            product.setSellerId(1L); // 임시 유저 세팅
        }
        
        // 정가(originalPrice) 정보가 폼에 없어서 null일 경우 공구가와 동일하게 처리
        if (product.getOriginalPrice() == null) {
            product.setOriginalPrice(product.getPrice());
        }

        // 이미지 파일 처리
        if (image != null && !image.isEmpty()) {
            try {
                // uploads 폴더가 없으면 생성
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // 중복 방지를 위한 UUID 파일명 생성
                String originalFilename = image.getOriginalFilename();
                String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : ".jpg";
                String savedFilename = UUID.randomUUID().toString() + extension;
                
                Path filePath = Paths.get(uploadDir + savedFilename);
                Files.write(filePath, image.getBytes());
                
                // 프론트엔드에서 접근할 수 있는 URL 경로 저장 (WebMvcConfigurer 연결 필요)
                product.setImageUrl("http://localhost:8080/uploads/" + savedFilename);
            } catch (IOException e) {
                e.printStackTrace();
                // 실제 서비스에서는 커스텀 예외 처리가 필요함
            }
        }

        return productRepository.save(product);
    }

    // 전체 상품 조회 로직
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 개별 상품 상세 조회 로직
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
    }

    // 공동구매 참여
    @Transactional
    public Product joinProduct(Long id) {
        Product product = getProductById(id);
        // 향후: 해당 유저가 이미 참여했는지 중복 검증 로직 추가
        product.incrementCurrentCount();
        return product; // 트랜잭션 종료 시 자동 더티 체킹으로 DB에 반영됨
    }

    // 공동구매 참여 취소
    @Transactional
    public Product cancelJoinProduct(Long id) {
        Product product = getProductById(id);
        product.decrementCurrentCount();
        return product;
    }
}