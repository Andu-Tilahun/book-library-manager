package com.booklibrary.api.gateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class CustomCsrfFilter implements GlobalFilter, Ordered {

    private static final String XSRF_TOKEN = "XSRF-TOKEN";
    private static final String AUTH_INIT_API_PATH = "api/auth/init";
    private static final String X_XSRF_TOKEN = "x-xsrf-token";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String requestUri = exchange.getRequest().getPath().value();

        if (requestUri.contains(AUTH_INIT_API_PATH)) {
            String csrfToken = getCsrfToken(exchange);
            return chain.filter(addCsrfTokenToHeader(exchange, csrfToken));
        } else {
            //TODO: Validate CSRF Token for other api calls
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }

    private String getCsrfToken(ServerWebExchange exchange) {
        HttpCookie csrfCookie = exchange.getRequest().getCookies().getFirst(XSRF_TOKEN);
        return csrfCookie != null ? csrfCookie.getValue(): "";
    }

    private ServerWebExchange addCsrfTokenToHeader(ServerWebExchange exchange, String csrfToken) {
        return exchange.mutate().request((r) -> {
            r.headers((headers) -> {
                headers.set(X_XSRF_TOKEN, csrfToken);
            });
        }).build();
    }
}
