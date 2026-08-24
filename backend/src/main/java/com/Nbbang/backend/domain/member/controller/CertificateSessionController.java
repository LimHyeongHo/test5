package com.Nbbang.backend.domain.member.controller;

import com.Nbbang.backend.domain.member.entity.CertificateSession;
import com.Nbbang.backend.domain.member.service.CertificateSessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/member/certificate")
// CORS는 SecurityConfig의 CorsConfigurationSource가 자격증명 포함으로 처리 (세션 쿠키 필요)
public class CertificateSessionController {

    private final CertificateSessionService certificateSessionService;

    public CertificateSessionController(CertificateSessionService certificateSessionService) {
        this.certificateSessionService = certificateSessionService;
    }

    // 남은 시간 조회 (새로고침 시 프론트가 이 값으로 카운트다운을 재동기화)
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status(HttpServletRequest request) {
        try {
            String userId = requireUserId(request);
            CertificateSession session = certificateSessionService.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("발급된 인증서 세션이 없습니다."));
            return ResponseEntity.ok(toResponse(session));
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // +5분/-5분 조정: DB의 만료시각을 실제로 갱신
    @PatchMapping("/extend")
    public ResponseEntity<Map<String, Object>> extend(@RequestBody Map<String, Integer> request,
                                                        HttpServletRequest httpRequest) {
        try {
            String userId = requireUserId(httpRequest);
            int deltaMinutes = request.getOrDefault("deltaMinutes", 0);
            CertificateSession session = certificateSessionService.extend(userId, deltaMinutes);
            return ResponseEntity.ok(toResponse(session));
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // 인증서 폐기 + 로그아웃 (프론트 타이머가 00:00에 도달했을 때 호출)
    @PostMapping("/revoke")
    public ResponseEntity<Map<String, String>> revoke(HttpServletRequest request) {
        try {
            String userId = requireUserId(request);
            certificateSessionService.revoke(userId);
            request.getSession().invalidate();

            Map<String, String> response = new HashMap<>();
            response.put("message", "인증서가 폐기되고 로그아웃되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    private String requireUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            throw new RuntimeException("로그인이 필요합니다.");
        }
        return (String) session.getAttribute("userId");
    }

    private Map<String, Object> toResponse(CertificateSession session) {
        long remainingSeconds = Duration.between(LocalDateTime.now(), session.getExpiresAt()).getSeconds();
        if (remainingSeconds < 0) remainingSeconds = 0;

        Map<String, Object> body = new HashMap<>();
        body.put("expired", remainingSeconds <= 0);
        body.put("expiresAt", session.getExpiresAt().toString());
        body.put("remainingSeconds", remainingSeconds);
        return body;
    }
}
