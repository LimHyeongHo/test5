package com.Nbbang.backend.global.exception;

/**
 * 프로젝트 전용 커스텀 예외 클래스입니다.
 * 비즈니스 로직에서 에러를 발생시킬 때 이 클래스를 사용합니다.
 *
 * 사용 예시:
 * throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
 *
 * 발생된 예외는 GlobalExceptionHandler 에서 자동으로 잡아 처리합니다.
 */
public class CustomException extends RuntimeException {

    private final ErrorCode errorCode;

    public CustomException(final ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
