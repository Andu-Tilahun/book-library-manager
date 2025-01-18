package com.booklibrary.user.service.application.exception.handler;

import com.booklibrary.application.api.Response;
import com.booklibrary.application.api.error.GlobalError;
import com.booklibrary.application.constant.ErrorCodes;
import com.booklibrary.application.util.CorrelationIdGenerator;
import com.booklibrary.user.service.data.exception.UserDomainException;
import com.booklibrary.user.service.data.exception.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
public class UserGlobalExceptionHandler {
    @ExceptionHandler(value = {UserDomainException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleException(UserDomainException userDomainException) {
        log.error(userDomainException.getMessage(), userDomainException);
        return Response.builder()
                .error(GlobalError
                        .builder()
                        .code(ErrorCodes.BAD_REQUEST.getCode())
                        .message(ErrorCodes.BAD_REQUEST.getMessage())
                        .build())
                .build();
    }

    @ExceptionHandler(value = {UserNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Response handleException(UserNotFoundException userNotFoundException, HttpServletRequest request) {
        log.error(userNotFoundException.getMessage(), userNotFoundException);
        return Response.builder()
                .error(GlobalError.
                        builder()
                        .code(ErrorCodes.DATA_NOT_FOUND.getCode())
                        .message(ErrorCodes.DATA_NOT_FOUND.getMessage())
                        .build())
                .correlationId(CorrelationIdGenerator.getCorrelationId(request))
                .build();
    }
}
