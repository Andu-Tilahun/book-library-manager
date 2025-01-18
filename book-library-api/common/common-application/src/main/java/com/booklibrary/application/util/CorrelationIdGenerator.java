package com.booklibrary.application.util;

import com.booklibrary.application.constant.HeaderCommonConstants;
import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ServerWebExchange;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

public class CorrelationIdGenerator {
    public static  String getCorrelationId(ServerWebExchange serverWebExchange) {
        HttpHeaders headers = serverWebExchange.getRequest().getHeaders();
        if(headers.get(HeaderCommonConstants.CORRELATION_ID_HEADER) != null) {
            return headers.get(HeaderCommonConstants.CORRELATION_ID_HEADER).get(0);
        }
        return UUID.randomUUID().toString();
    }
    public static  String getCorrelationId(HttpServletRequest request) {
        if(request.getHeader(HeaderCommonConstants.CORRELATION_ID_HEADER.getValue()) != null) {
            return request.getHeader(HeaderCommonConstants.CORRELATION_ID_HEADER.getValue());
        }
        return UUID.randomUUID().toString();
    }
}
