package com.Nbbang.backend.domain.chat.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * WebSocket CONNECT 시 HTTP 세션에서 userId를 읽어 Principal로 설정합니다.
 * PKI 로그인 성공 시 session.setAttribute("userId", email) 저장이 전제됩니다.
 */
@Component
public class StompAuthInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            Map<String, Object> sessionAttrs = accessor.getSessionAttributes();
            if (sessionAttrs != null) {
                String userId = (String) sessionAttrs.get("userId");
                String role = (String) sessionAttrs.getOrDefault("role", "ROLE_USER");
                if (userId != null) {
                    accessor.setUser(new UsernamePasswordAuthenticationToken(
                            userId, null, List.of(new SimpleGrantedAuthority(role))));
                }
            }
        }
        return message;
    }
}
