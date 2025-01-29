package com.booklibrary.user.service.application.service;

import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.data.dto.UserDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Map;

public interface IAMService {
    void addUser(UserDto userDto) throws IOException;

    IAMUser getUserByUserName(String userName);

     IAMUser getUserByUserId(String userId);
    ResponseEntity<Map> generateToken(String grantType, String clientId, String clientSecret);
}
