package com.Nbbang.backend.domain.chat.dto;

import com.Nbbang.backend.domain.chat.entity.MessageType;
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
 *
 * 이미지 메시지는 type: 'IMAGE', content에 업로드된 이미지 URL을 담아서 보냄
 * (이미지 URL은 POST /api/chat/upload 로 먼저 업로드해서 받음)
 */
@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {
    private Long roomId;
    private String content;
    private MessageType type;
}
