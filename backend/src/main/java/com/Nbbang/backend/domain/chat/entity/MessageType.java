package com.Nbbang.backend.domain.chat.entity;

public enum MessageType {
    CHAT,   // 일반 메시지
    IMAGE,  // 이미지 메시지
    JOIN,   // 입장
    LEAVE,  // 퇴장
    READ    // 읽음 처리 이벤트
}
