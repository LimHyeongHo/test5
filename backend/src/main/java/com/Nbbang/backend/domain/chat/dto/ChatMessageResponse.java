package com.Nbbang.backend.domain.chat.dto;

import com.Nbbang.backend.domain.chat.entity.ChatMessage;
import com.Nbbang.backend.domain.chat.entity.MessageType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 서버 → 프론트로 전달되는 메시지 응답 형식
 * WebSocket 브로드캐스트와 REST 메시지 내역 조회 모두에 사용
 */
@Getter
public class ChatMessageResponse {

    private final Long id;
    private final Long roomId;
    private final String senderEmail;
    private final String senderNickname;
    private final String content;
    private final MessageType type;
    private final LocalDateTime sentAt;
    @JsonProperty("isRead")
    private final boolean isRead;

    public ChatMessageResponse(Long id, Long roomId, String senderEmail, String senderNickname,
                               String content, MessageType type, LocalDateTime sentAt, boolean isRead) {
        this.id = id;
        this.roomId = roomId;
        this.senderEmail = senderEmail;
        this.senderNickname = senderNickname;
        this.content = content;
        this.type = type;
        this.sentAt = sentAt;
        this.isRead = isRead;
    }

    public static ChatMessageResponse from(ChatMessage message, String nickname) {
        return new ChatMessageResponse(
                message.getId(),
                message.getRoomId(),
                message.getSenderEmail(),
                nickname,
                message.getContent(),
                message.getType(),
                message.getSentAt(),
                message.isRead()
        );
    }

    /** READ 이벤트 전용 — 상대방이 읽었음을 알릴 때 사용 */
    public static ChatMessageResponse readEvent(Long roomId) {
        return new ChatMessageResponse(
                null, roomId, null, null, null, MessageType.READ, LocalDateTime.now(), true);
    }
}
