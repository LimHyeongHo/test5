package com.Nbbang.backend.domain.chat.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 * WebSocket 세션 끊김 이벤트 처리
 * 브라우저 종료 or 네트워크 끊김 시 자동으로 호출됩니다.
 */
@Component
@Slf4j
public class WebSocketEventListener {

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        log.info("WebSocket 연결 끊김 — sessionId: {}", sessionId);
    }
}
