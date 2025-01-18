package com.booklibrary.application.api;

import com.booklibrary.application.api.error.GlobalError;
import com.booklibrary.application.api.error.ValidationError;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Generic REST API Response
 *
 * @param <T>
 * @author Andualem Tilahun
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response<T> {

    protected T data;
    protected GlobalError error;
    protected List<ValidationError> validationErrors;
    protected String correlationId;
    protected String message;

    public Response() {
    }

    public Response(String correlationId) {
        this.correlationId = correlationId;
    }

    public Response(T data) {
        this.data = data;
    }

    public Response(T data, String correlationId, String message) {
        this(data);
        this.correlationId = correlationId;
        this.message = message;
    }

    public Response(T data, GlobalError globalError, List<ValidationError> validationErrors, String correlationId, String message) {
        this.data = data;
        this.error = globalError;
        this.validationErrors = validationErrors;
        this.correlationId = correlationId;
        this.message = message;
    }


    public Response(GlobalError globalError, String correlationId, String message) {
        this(globalError,null, correlationId,message);
    }

    public Response(List<ValidationError> validationErrors, String correlationId, String message) {
        this(null,validationErrors, correlationId,message);
    }

    public Response(GlobalError globalError, List<ValidationError> validationErrors, String correlationId, String message) {
        this(null, globalError,validationErrors, correlationId, message);
    }
}

