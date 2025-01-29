package com.booklibrary.api.gateway.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class RedisSessionManager {

    @Value("${spring.application.session.redis.namespace}")
    private String redisNamespace;

    private final RedisTemplate<String, UserSession> redisTemplate;


    public RedisSessionManager(RedisTemplate<String, UserSession> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void addSession(String key, UserSession newUserSession) {
        redisTemplate.opsForValue().set(constructKey(key), newUserSession);
    }

    public UserSession getSession(String key) {
        UserSession existingSession = redisTemplate.opsForValue().get(constructKey(key));
        return existingSession;
    }

    public Mono<UserSession> getMonoSession(String key) {
        return Mono.fromCallable(() -> redisTemplate.opsForValue().get(constructKey(key)));
    }

    public void removeWebSession(String webSessionId) {
        String sessionKey = "cms:gateway:sessions:" + webSessionId;
        Mono.fromRunnable(() -> {
            redisTemplate.delete(sessionKey);  // This deletes the session key for the user
            log.info("Old session for user  invalidated (session ID: {})", sessionKey);
        }).subscribe();
    }

    public Mono<Boolean> removeSession(String key) {
        log.info("removeUserSession {}", key);
        return Mono.fromCallable(() -> redisTemplate.delete(constructKey(key)));
    }

    //cms:gateway:sessions:d33895da-6464-4563-add9-0086572a9382
    private String constructKey(String key) {
        return redisNamespace + ":" + key;
    }
}
