package com.booklibrary.book.service.application.exception.handler;

import com.booklibrary.application.api.Response;
import com.booklibrary.application.api.error.GlobalError;
import com.booklibrary.application.constant.ErrorCodes;
import com.booklibrary.application.util.CorrelationIdGenerator;
import com.booklibrary.book.service.data.exception.BookDomainException;
import com.booklibrary.book.service.data.exception.BookNotFoundException;
import com.booklibrary.book.service.data.exception.BookValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
public class BookGlobalExceptionHandler {
    @ExceptionHandler(value = {BookDomainException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleException(BookDomainException bookDomainException) {
        log.error(bookDomainException.getMessage(), bookDomainException);
        return Response.builder()
                .error(GlobalError
                        .builder()
                        .code(ErrorCodes.BAD_REQUEST.getCode())
                        .message(ErrorCodes.BAD_REQUEST.getMessage())
                        .build())
                .build();
    }

    @ExceptionHandler(value = {BookNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Response handleException(BookNotFoundException bookNotFoundException, HttpServletRequest request) {
        log.error(bookNotFoundException.getMessage(), bookNotFoundException);
        return Response.builder()
                .error(GlobalError.
                        builder()
                        .code(ErrorCodes.DATA_NOT_FOUND.getCode())
                        .message(ErrorCodes.DATA_NOT_FOUND.getMessage())
                        .build())
                .correlationId(CorrelationIdGenerator.getCorrelationId(request))
                .build();
    }

    @ExceptionHandler(value = {BookValidationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleException(BookValidationException bookValidationException, HttpServletRequest request) {
        log.error(bookValidationException.getMessage(), bookValidationException);
        return Response.builder()
                .error(GlobalError.
                        builder()
                        .code(ErrorCodes.BAD_REQUEST.getCode())
                        .message(ErrorCodes.BAD_REQUEST.getMessage())
                        .build())
                .correlationId(CorrelationIdGenerator.getCorrelationId(request))
                .build();
    }
}
