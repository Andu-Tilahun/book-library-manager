package com.booklibrary.api.gateway.service;

import com.booklibrary.api.gateway.config.SecurityHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@Service
@Slf4j
public class SessionHandler {

    private final SecurityHelper securityHelper;
    private final RedisSessionManager redisSessionManager;
    private final RedisWebSessionService redisWebSessionService;

    public SessionHandler(SecurityHelper securityHelper,
                          RedisSessionManager redisSessionManager,
                          RedisWebSessionService redisWebSessionService) {
        this.securityHelper = securityHelper;
        this.redisSessionManager = redisSessionManager;
        this.redisWebSessionService = redisWebSessionService;
    }

    public Mono<Void> handleAuthenticationSession(WebFilterExchange webFilterExchange, Authentication authentication) {
        String username = authentication.getName();
        String oidcSessionId = securityHelper.getOidcSessionId(authentication);
        this.invalidateOldSession(username).subscribe();
        return webFilterExchange.getExchange().getSession()
                .flatMap(webSession -> {
                    String sessionId = webSession.getId();
                    UserSession userSession = new UserSession(oidcSessionId, sessionId);
                    updateUserSession(username, userSession);
                    return Mono.empty();
                });
    }

    public Mono<Void> invalidateOldSession(String userName) {

        return redisSessionManager.getMonoSession(userName)
                .flatMap(userSession -> {
                    this.terminateUserSession(userName, userSession);

                    return Mono.empty(); // If session ID doesn't match, return an empty Mono
                });
        // If no user session is found, return an empty Mono

    }

    public Mono<Void> invalidateOldSession(String userName, WebFilterExchange exchange) {
        return exchange.getExchange().getSession()
                .flatMap(webSession -> {
                    String sessionId = webSession.getId();
                    return redisSessionManager.getMonoSession(userName)
                            .flatMap(userSession -> {
                                if (userSession.getWebSessionId().equals(sessionId)) {
                                    this.terminateUserSession(userName, userSession);
                                }
                                redisWebSessionService.clearWebSession(exchange.getExchange());

                                return Mono.empty(); // If session ID doesn't match, return an empty Mono
                            });
                    // If no user session is found, return an empty Mono
                });
    }

    private void updateUserSession(String userId, UserSession newUserSession) {
        // Check if an old session exists for the user

        UserSession existingSession = redisSessionManager.getSession(userId);

        if (existingSession != null) {
            // Remove the old session
            redisSessionManager.removeSession(userId).subscribe();

            //Remove the old web session from redis
            // sessionRepository.deleteById(existingSession.getWebSessionId())
            //   .subscribe();;

            // Call your custom method
            //terminateUserSession(userId, existingSession);
        }

        redisSessionManager.addSession(userId, newUserSession);
        System.out.println("New session saved for user: " + userId);
    }

    private void terminateUserSession(String userId, UserSession oldSession) {
        securityHelper.logout(oldSession.getKeycloakSessionId());
//        redisSessionManager.removeWebSession(oldSession.getWebSessionId());
        redisSessionManager.removeSession(userId).subscribe();
    }

}
