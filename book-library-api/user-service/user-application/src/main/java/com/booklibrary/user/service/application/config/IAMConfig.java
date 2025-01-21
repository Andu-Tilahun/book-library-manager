package com.booklibrary.user.service.application.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class IAMConfig {
    @Value("${iam.keycloak.endpoints.server-url}")
    private String serverUrl;

    @Value("${iam.keycloak.bms-web-client-id}")
    private String webClientId;

    @Value("${iam.keycloak.bms-web-client-secret}")
    private String webClientSecret;

    @Value("${iam.keycloak.bms-service-client-id}")
    private String serviceClientId;

    @Value("${iam.keycloak.bms-service-client-secret}")
    private String serviceClientSecret;

    @Value("${iam.keycloak.realm}")
    private String realm;

    @Value("${iam.keycloak.endpoints.users}")
    private String usersEndpoint;

    @Value("${iam.keycloak.endpoints.clients}")
    private String clientsEndpoint;

    @Value("${iam.keycloak.endpoints.token}")
    private String accessTokenEndpoint;

    @Value("${iam.keycloak.endpoints.user-info}")
    private String userInfoEndpoint;
}
