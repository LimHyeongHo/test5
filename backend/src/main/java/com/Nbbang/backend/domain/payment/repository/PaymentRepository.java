package com.Nbbang.backend.domain.payment.repository;

import com.Nbbang.backend.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(String orderId);
    // 기본 크루드(저장, 조회, 수정, 삭제) 메서드가 자동으로 제공됩니다.
}
