package com.Nbbang.backend.domain.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 프론트에서 WebSocket으로 메시지 전송 시 보내는 요청 형식
 *
 * 사용 예시 (프론트):
 * stompClient.publish({
 *   destination: '/app/chat.message',
 *   body: JSON.stringify({ roomId: 1, content: '안녕하세요' })
 * });
 */
@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {
    private Long roomId;
    private String content;
}
