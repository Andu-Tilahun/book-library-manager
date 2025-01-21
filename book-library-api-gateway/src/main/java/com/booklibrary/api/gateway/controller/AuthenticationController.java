package com.booklibrary.api.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class AuthenticationController {

    @GetMapping(path = "/")
    public Mono<String> completeLoginHandler() {
        return Mono.empty();
    }

    @GetMapping(path = "keep-alive")
    public Mono<Void> keepAliveHandler() {
        return Mono.empty();
    }
}
