package com.booklibrary.application.filter;

import com.booklibrary.application.api.RequestBean;
import com.booklibrary.application.constant.HeaderCommonConstants;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@Slf4j
public class RequestFilter extends OncePerRequestFilter {

    private RequestBean requestBean;

    @Value("${bms.service-name}")
    private String serviceName;

    public RequestFilter(RequestBean requestBean) {
        this.requestBean = requestBean;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("Content-Type: " + request.getContentType());

        String corrId = request.getHeader(HeaderCommonConstants.CORRELATION_ID_HEADER.getValue());
        String csrfToken = request.getHeader(HeaderCommonConstants.REQ_CSRF_TOKEN_HEADER.getValue());
        String userId = pullAuthenticatedUser();

        if (!StringUtils.hasText(corrId)) {
            corrId = UUID.randomUUID().toString();
        }

        addToMDC("corrId", corrId);

        addToMDC("userId", userId);
        addToMDC("serviceName", serviceName);

        requestBean.initialize(corrId, userId, csrfToken);
        filterChain.doFilter(request, response);
    }

    private void addToMDC(String key, String value) {
        if (StringUtils.hasText(key) && StringUtils.hasText(value)) {
            MDC.put(key, value);
        }
    }

    private String pullAuthenticatedUser() {
        try {
            Optional<String> userId = Optional.ofNullable(SecurityContextHolder.getContext())
                    .map(SecurityContext::getAuthentication)
                    .filter(Authentication::isAuthenticated)
                    .map(Authentication::getName);

            if (userId.isPresent()) {
                return userId.get();
            }

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return "";
    }
}
