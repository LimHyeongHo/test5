package com.Nbbang.backend.global.exception;

import lombok.Getter;

/**
 * 에러 발생 시 프론트엔드로 전달되는 공통 응답 형식입니다.
 *
 * 응답 예시:
 * {
 *   "success": false,
 *   "code": "DUPLICATE_EMAIL",
 *   "message": "이미 사용 중인 이메일입니다"
 * }
 *
 * 사용법:
 * return ResponseEntity
 *     .status(errorCode.getStatus())
 *     .body(ErrorResponse.of(errorCode));
 */
@Getter
public class ErrorResponse {

    private final boolean success;  // 에러 응답이므로 항상 false
    private final String code;      // ErrorCode enum 이름 (예: "DUPLICATE_EMAIL")
    private final String message;   // 사용자에게 표시할 메시지

    private ErrorResponse(final ErrorCode errorCode) {
        this.success = false;
        this.code = errorCode.name();
        this.message = errorCode.getMessage();
    }

    /**
     * ErrorResponse 생성 메서드
     * new 키워드 대신 이 메서드를 통해서만 생성할 수 있습니다.
     *
     * 사용 예시:
     * ErrorResponse.of(ErrorCode.DUPLICATE_EMAIL)
     */
    public static ErrorResponse of(final ErrorCode errorCode) {
        return new ErrorResponse(errorCode);
    }
}
