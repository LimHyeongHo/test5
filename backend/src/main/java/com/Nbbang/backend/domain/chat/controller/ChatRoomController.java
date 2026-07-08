package com.Nbbang.backend.domain.chat.controller;

import com.Nbbang.backend.domain.chat.dto.ChatMessageResponse;
import com.Nbbang.backend.domain.chat.dto.ChatRoomResponse;
import com.Nbbang.backend.domain.chat.entity.ChatRoom;
import com.Nbbang.backend.domain.chat.service.ChatMessageService;
import com.Nbbang.backend.domain.chat.service.ChatRoomService;
import com.Nbbang.backend.global.exception.CustomException;
import com.Nbbang.backend.global.exception.ErrorCode;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 채팅방 REST API
 *
 * GET  /api/chat/rooms                        내 채팅방 목록
 * POST /api/chat/rooms                        채팅방 생성 (또는 기존 방 반환)
 * GET  /api/chat/rooms/{roomId}/messages      메시지 내역
 * POST /api/chat/rooms/{roomId}/read          읽음 처리
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations messagingTemplate;

    /** 내 채팅방 목록 */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getRooms(HttpSession session) {
        return ResponseEntity.ok(chatRoomService.getRooms(getEmail(session)));
    }

    /**
     * 채팅방 생성 or 기존 방 반환
     * 요청 body: { sellerEmail, productId, productName }
     */
    @PostMapping("/rooms")
    public ResponseEntity<Map<String, Long>> createRoom(
            @RequestBody Map<String, String> body,
            HttpSession session) {
        String buyerEmail = getEmail(session);
        String sellerEmail = body.get("sellerEmail");
        Long productId = Long.parseLong(body.get("productId"));
        String productName = body.get("productName");

        ChatRoom room = chatRoomService.findOrCreate(buyerEmail, sellerEmail, productId, productName);
        return ResponseEntity.ok(Map.of("roomId", room.getId()));
    }

    /** 메시지 내역 (최근 50개) */
    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(
            @PathVariable Long roomId,
            HttpSession session) {
        ChatRoom room = chatRoomService.getRoom(roomId);
        validateAccess(room, getEmail(session));
        return ResponseEntity.ok(chatMessageService.getHistory(roomId));
    }

    /** 읽음 처리 + WebSocket READ 이벤트 브로드캐스트 */
    @PostMapping("/rooms/{roomId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long roomId, HttpSession session) {
        String myEmail = getEmail(session);
        ChatRoom room = chatRoomService.getRoom(roomId);
        validateAccess(room, myEmail);
        chatMessageService.markAsRead(roomId, myEmail);
        chatRoomService.resetUnreadCount(roomId, myEmail);
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, ChatMessageResponse.readEvent(roomId));
        return ResponseEntity.ok().build();
    }

    /** 세션에서 userId(email) 추출 — 로그인 안 된 경우 401 */
    private String getEmail(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) throw new CustomException(ErrorCode.AUTH_UNAUTHORIZED);
        return userId;
    }

    private void validateAccess(ChatRoom room, String myEmail) {
        if (!myEmail.equals(room.getBuyerEmail()) && !myEmail.equals(room.getSellerEmail())) {
            throw new CustomException(ErrorCode.CHAT_ACCESS_DENIED);
        }
    }
}
