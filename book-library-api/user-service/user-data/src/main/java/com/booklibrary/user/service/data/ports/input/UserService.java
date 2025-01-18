package com.booklibrary.user.service.data.ports.input;

import com.booklibrary.user.service.data.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);

    List<UserDto> findAllUsers();

    UserDto findById(String id);

}
