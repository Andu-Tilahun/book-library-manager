package com.booklibrary.application.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class JwtAuthConverter extends JwtAuthenticationConverter {

    public JwtAuthConverter() {
        setJwtGrantedAuthoritiesConverter(this::extractRolesFromJwt);
    }

    private Collection<GrantedAuthority> extractRolesFromJwt(Jwt jwt) {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null) {
            Map<String, Object> bmsClient = (Map<String, Object>) resourceAccess.get("bms-web-client");
            if (bmsClient != null) {
                List<String> roles = (List<String>) bmsClient.get("roles");
                if (roles != null) {
                    authorities.addAll(roles.stream()
                            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                            .collect(Collectors.toList()));
                }
            }
        }
        return authorities;
    }
}
