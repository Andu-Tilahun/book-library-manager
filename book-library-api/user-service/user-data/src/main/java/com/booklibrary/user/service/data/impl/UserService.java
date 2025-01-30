package com.booklibrary.user.service.data.impl;

import com.booklibrary.user.service.data.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserDto createUser(UserDto userDto);

    List<UserDto> findAllUsers();

    Optional<UserDto> findById(String id);

}
