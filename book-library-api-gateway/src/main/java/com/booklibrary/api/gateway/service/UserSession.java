package com.booklibrary.api.gateway.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSession {

    private String keycloakSessionId;

    private String webSessionId;
}
