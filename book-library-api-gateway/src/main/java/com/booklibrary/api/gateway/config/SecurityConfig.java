package com.booklibrary.api.gateway.config;

import com.booklibrary.api.gateway.service.SessionHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.server.WebSessionServerOAuth2AuthorizedClientRepository;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Collections;

@Slf4j
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${bms.allowed-origins}")
    private String[] allowedOrigins;

    @Value("${bms.post-logout-redirect-uris}")
    private String[] postLogoutRedirectUris;

    @Autowired
    private SessionHandler sessionHandler;

    @Bean
    ServerOAuth2AuthorizedClientRepository authorizedClientRepository() {
        return new WebSessionServerOAuth2AuthorizedClientRepository();
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http, ReactiveClientRegistrationRepository clientRegistrationRepository) {
        http

                .authorizeExchange(exchange -> {
                    exchange.anyExchange().authenticated();
                }).exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED)))
                //.oauth2Login(Customizer.withDefaults())
                .oauth2Login(login -> login
                        .authenticationSuccessHandler(sessionHandler::handleAuthenticationSession)
                )
                //.logout(logout -> logout.logoutSuccessHandler(oidcLogoutSuccessHandler(clientRegistrationRepository)))
                .logout(logout -> logout.logoutSuccessHandler((exchange, authentication) -> {
                    ServerLogoutSuccessHandler logoutSuccessHandler = oidcLogoutSuccessHandler(clientRegistrationRepository, exchange, authentication);
                    return logoutSuccessHandler.onLogoutSuccess(exchange, authentication);
                }).logoutHandler((exchange, authentication) -> {
                    String username = authentication.getName();
                    return sessionHandler.invalidateOldSession(username, exchange);

                }))
                .csrf(csrf -> csrf.csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse()));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(Collections.singletonList("*"));
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        configuration.setAllowedHeaders(Collections.singletonList("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private ServerLogoutSuccessHandler oidcLogoutSuccessHandler(ReactiveClientRegistrationRepository clientRegistrationRepository, WebFilterExchange exchange, Authentication authentication) {
        var redirectUris = Arrays.asList(postLogoutRedirectUris);
        var redirectUri = "";
        String requestUrl = exchange.getExchange().getRequest().getHeaders().getOrigin();
        if (requestUrl.equals(allowedOrigins[0])) {
            redirectUri = redirectUris.get(0);
        } else if (requestUrl.equals(allowedOrigins[1])) {
            redirectUri = redirectUris.get(1);
        }
        var oidcLogoutSuccessHandler = new OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository);
        oidcLogoutSuccessHandler.setPostLogoutRedirectUri(redirectUri);
        return oidcLogoutSuccessHandler;
    }

    @Bean
    WebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        for (var allowedOrigin : allowedOrigins
        ) {
            config.addAllowedOrigin(allowedOrigin);
        }

        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }

    @Bean
    WebFilter csrfWebFilter() {
        return (exchange, chain) -> {
            exchange.getResponse().beforeCommit(() -> Mono.defer(() -> {
                Mono<CsrfToken> csrfToken = exchange.getAttribute(CsrfToken.class.getName());
                return csrfToken != null ? csrfToken.then() : Mono.empty();
            }));
            return chain.filter(exchange);
        };
    }
}
