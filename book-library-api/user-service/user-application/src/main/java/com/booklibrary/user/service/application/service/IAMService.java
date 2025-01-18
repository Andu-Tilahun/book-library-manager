package com.booklibrary.user.service.application.service;

import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.data.dto.UserDto;

import java.io.IOException;

public interface IAMService {
    void addUser(UserDto userDto) throws IOException;

    IAMUser getUserByUserName(String userName);
}
