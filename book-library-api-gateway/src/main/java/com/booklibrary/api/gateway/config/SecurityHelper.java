package com.booklibrary.api.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
@Slf4j
public class SecurityHelper {
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
