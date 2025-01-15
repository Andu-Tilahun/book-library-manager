package com.booklibrary.application.constant;

public enum HeaderCommonConstants {
    CORRELATION_ID_HEADER("x-correlation-id"),
    REQ_CSRF_TOKEN_HEADER("x-xsrf-token"),
    REQUEST_ID_HEADER("x-request-id");

    private String value;

    HeaderCommonConstants(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
