package com.Nbbang.backend.domain.chat.repository;

import com.Nbbang.backend.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 내 채팅방 목록 (구매자 또는 판매자로 참여한 방)
    List<ChatRoom> findByBuyerEmailOrSellerEmailOrderByLastSentAtDesc(String buyerEmail, String sellerEmail);

    // 기존 채팅방 조회 (같은 구매자-판매자-상품 조합이면 재사용)
    Optional<ChatRoom> findByBuyerEmailAndSellerEmailAndProductId(String buyerEmail, String sellerEmail, Long productId);
}
