package com.Nbbang.backend.domain.chat.service;

import com.Nbbang.backend.domain.auth.repository.UserAccountRepository;
import com.Nbbang.backend.domain.chat.dto.ChatMessageResponse;
import com.Nbbang.backend.domain.chat.entity.ChatMessage;
import com.Nbbang.backend.domain.chat.entity.MessageType;
import com.Nbbang.backend.domain.chat.repository.ChatMessageRepository;
import com.Nbbang.backend.global.exception.CustomException;
import com.Nbbang.backend.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserAccountRepository userAccountRepository;

    /** 메시지 저장 후 응답 DTO 반환 */
    @Transactional
    public ChatMessageResponse save(Long roomId, String senderEmail, String content, MessageType type) {
        ChatMessage message = new ChatMessage();
        message.setRoomId(roomId);
        message.setSenderEmail(senderEmail);
        message.setContent(content);
        message.setType(type);
        chatMessageRepository.save(message);

        String nickname = userAccountRepository.findById(senderEmail)
                .map(u -> u.getNickname())
                .orElse(senderEmail);

        return ChatMessageResponse.from(message, nickname);
    }

    /** 채팅방 메시지 내역 조회 (최근 50개) */
    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getHistory(Long roomId) {
        try {
            return chatMessageRepository
                    .findTop50ByRoomIdAndTypeOrderBySentAtAsc(roomId, MessageType.CHAT)
                    .stream()
                    .map(msg -> {
                        String nickname = userAccountRepository.findById(msg.getSenderEmail())
                                .map(u -> u.getNickname())
                                .orElse(msg.getSenderEmail());
                        return ChatMessageResponse.from(msg, nickname);
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CHAT_HISTORY_LOAD_FAILED);
        }
    }

    /** 안읽은 메시지 읽음 처리 */
    @Transactional
    public void markAsRead(Long roomId, String readerEmail) {
        chatMessageRepository.markAsRead(roomId, readerEmail);
    }
}
