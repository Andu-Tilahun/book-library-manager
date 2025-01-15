package com.booklibrary.application.handler;

import com.booklibrary.application.api.Response;
import com.booklibrary.application.api.error.GlobalError;
import com.booklibrary.application.constant.ErrorCodes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = {Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response handleException(Exception exception) {
        log.error(exception.getMessage(), exception);
        return Response.builder()
                .error(GlobalError
                        .builder()
                        .code(ErrorCodes.GENERIC_ERROR.getCode())
                        .message(exception.getMessage())
                        .build())
                .build();
    }
}
