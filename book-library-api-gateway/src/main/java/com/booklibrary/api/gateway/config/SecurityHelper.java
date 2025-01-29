package com.booklibrary.api.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Map;

@Service
@Slf4j
public class SecurityHelper {

    @Value("${iam.keycloak.endpoints.token}")
    private String accessTokenEndpoint;

    @Value("${iam.keycloak.endpoints.session-url}")
    private String sessionEndpoint;

    @Value("${iam.keycloak.bms-web-client-id}")
    private String serviceClientId;

    @Value("${iam.keycloak.bms-web-client-secret}")
    private String serviceClientSecret;

    private final RestTemplate restTemplate;

    public SecurityHelper(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void logout(String sessionId) {

        String accessToken = getAccessToken();

        String url = sessionEndpoint + sessionId;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        ResponseEntity<Object[]> response = restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                entity,
                Object[].class);

        if (response.getStatusCode() == HttpStatus.NO_CONTENT) {
            log.info("Successfully logged out session id {}", sessionId);
        }
    }


    //Get Access Token from IAM
    private String getAccessToken() {
        String url = accessTokenEndpoint;

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", serviceClientId);
        map.add("client_secret", serviceClientSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Failed to get access token");
        }
    }

    public String getOidcSessionId(Authentication authentication) {

        Assert.notNull(authentication, "Authentication cannot be null.");

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof DefaultOidcUser)) {
            throw new IllegalStateException("Authentication principal is not a valid OIDC user.");
        }

        DefaultOidcUser oidcUser = (DefaultOidcUser) principal;

        OidcIdToken idToken = oidcUser.getIdToken();

        Assert.notNull(idToken, "ID token is missing in the authentication principal.");

        String sessionId = idToken.getClaim("sid");

        Assert.notNull(sessionId, "OIDC session ID (sid) is missing in the ID token claims.");

        return sessionId;
    }
}
