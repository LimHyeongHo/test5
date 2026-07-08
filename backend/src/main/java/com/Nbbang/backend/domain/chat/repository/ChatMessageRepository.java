package com.Nbbang.backend.domain.chat.repository;

import com.Nbbang.backend.domain.chat.entity.ChatMessage;
import com.Nbbang.backend.domain.chat.entity.MessageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 채팅방 메시지 내역 (최근 50개)
    List<ChatMessage> findTop50ByRoomIdAndTypeOrderBySentAtAsc(Long roomId, MessageType type);

    // 안읽은 메시지 일괄 읽음 처리
    @Modifying
    @Query("UPDATE ChatMessage m SET m.isRead = true WHERE m.roomId = :roomId AND m.senderEmail != :readerEmail AND m.isRead = false")
    void markAsRead(@Param("roomId") Long roomId, @Param("readerEmail") String readerEmail);
}
