package com.booklibrary.user.service.application.service;

import com.booklibrary.user.service.application.config.IAMConfig;
import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.application.mapper.IAMUserMapper;
import com.booklibrary.user.service.data.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@Service
public class IAMServiceImpl implements IAMService {
    @Autowired
    RestTemplate restTemplate;

    private final IAMConfig iamConfig;

    private final IAMUserMapper iamUserMapper;

    public IAMServiceImpl(IAMConfig iamConfig, IAMUserMapper iamUserMapper) {
        this.iamConfig = iamConfig;
        this.iamUserMapper = iamUserMapper;
    }

    @Override
    public void addUser(UserDto userDto) throws IOException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        httpHeaders.setBearerAuth(getAccessToken());
        IAMUser iamUser = iamUserMapper.mapUserDtoToIAMUser(userDto);
        HttpEntity<IAMUser> entity = new HttpEntity<>(iamUser, httpHeaders);
        restTemplate.exchange(
                iamConfig.getUsersEndpoint(),
                HttpMethod.POST,
                entity,
                String.class,
                iamConfig.getRealm()
        );
    }

    @Override
    public IAMUser getUserByUserName(String username) {
        HttpHeaders httpHeaders = buildHeader();
        httpHeaders.setBearerAuth(getAccessToken());
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        String url = iamConfig.getUsersEndpoint() + "?username=" + username;
        ResponseEntity<IAMUser[]> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                IAMUser[].class,
                iamConfig.getRealm(),
                username);

        if (response.getStatusCode() == HttpStatus.OK) {
            IAMUser[] responseBody = response.getBody();
            return responseBody[0];
        }
        return null;
    }

    @Override
    public IAMUser getUserByUserId(String userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getAccessToken());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = iamConfig.getUsersEndpoint() + "/" + userId;
        ResponseEntity<IAMUser> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                IAMUser.class,
                iamConfig.getRealm(),
                userId
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            IAMUser responseBody = response.getBody();
            return responseBody;
        }
        return null;
    }

    private String getAccessToken() {
        String url = iamConfig.getAccessTokenEndpoint();
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", iamConfig.getServiceClientId());
        map.add("client_secret", iamConfig.getServiceClientSecret());
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, buildHeader());
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class,
                iamConfig.getRealm()
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Failed to get access token");
        }
    }

    private HttpHeaders buildHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return headers;
    }
}
