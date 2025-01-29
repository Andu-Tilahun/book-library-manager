package com.booklibrary.api.gateway.filters;


import com.booklibrary.api.gateway.service.RedisSessionManager;
import com.booklibrary.api.gateway.service.UserSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class SessionValidationFilter implements WebFilter {

    private final RedisSessionManager redisSessionManager;

    public SessionValidationFilter(RedisSessionManager redisSessionManager) {
        this.redisSessionManager = redisSessionManager;
    }

//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !authentication.isAuthenticated()) {
//            return chain.filter(exchange);
//        }
//        // Extract username and session ID reactively
//        return extractUsernameFromPrincipal(exchange)
//                .flatMap(username -> extractSessionId(exchange)
//                        .flatMap(sessionId -> {
//                            UserSession userSession = redisSessionManager.getSession(username);
//                            if (userSession != null) {
//                                if (!sessionId.equals(userSession.getWebSessionId())) {
//                                    log.error("Error occurred during session validation: {}", userSession.getWebSessionId());
//                                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//                                    return exchange.getResponse().setComplete();
//                                }
//                            }
//                            return chain.filter(exchange);
//                        })
//                )
//                .onErrorResume(ex -> {
//                    // Log and handle errors, such as unauthorized access
//                    log.error("Error occurred during session validation: {}", ex.getMessage());
//                    return chain.filter(exchange);
//                });
//    }


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return ReactiveSecurityContextHolder.getContext()
                .flatMap(securityContext -> {
                    Authentication authentication = securityContext.getAuthentication();
                    if (authentication == null || !authentication.isAuthenticated()) {
                        return chain.filter(exchange);
                    }
                    return extractUsernameFromPrincipal(authentication) // Updated call
                            .flatMap(username -> extractSessionId(exchange)
                                    .flatMap(sessionId -> {
                                        UserSession userSession = redisSessionManager.getSession(username);
                                        if (userSession != null) {
                                            if (!sessionId.equals(userSession.getWebSessionId())) {
                                                log.error("Error during session validation: {}", userSession.getWebSessionId());
                                                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                                                return exchange.getResponse().setComplete();
                                            }
                                        }
                                        return chain.filter(exchange);
                                    })
                            );
                })
                .switchIfEmpty(chain.filter(exchange)) // Handle cases where context is absent
                .onErrorResume(ex -> {
                    log.error("Error during session validation: {}", ex.getMessage());
                    return chain.filter(exchange);
                });
    }


    private Mono<String> extractSessionId(ServerWebExchange exchange) {
        return exchange.getSession()
                .flatMap(webSession -> {
                    String sessionId = webSession.getId();
                    log.info("Extracted session Id {}", sessionId);
                    return Mono.just(sessionId);
                });
    }

    private Mono<String> extractUsernameFromPrincipal(ServerWebExchange exchange) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    String username = principal.getName();
                    if (username == null || username.isEmpty()) {
                        log.warn("Principal name is empty or null. Rejecting the request.");
                        return Mono.error(new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Unauthorized: Principal name is empty or null."));
                    }
                    return Mono.just(username);
                });
    }

    private Mono<String> extractUsernameFromPrincipal(Authentication authentication) {
        String username = authentication.getName();
        if (username == null || username.isEmpty()) {
            log.warn("Principal name is empty or null. Rejecting the request.");
            return Mono.error(new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Unauthorized: Principal name is empty or null."));
        }
        return Mono.just(username);
    }


}

