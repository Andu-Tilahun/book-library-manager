package com.booklibrary.user.service.data.impl;

import com.booklibrary.user.service.data.dto.UserDto;
import com.booklibrary.user.service.data.entity.UserEntity;
import com.booklibrary.user.service.data.exception.UserDomainException;
import com.booklibrary.user.service.data.exception.UserNotFoundException;
import com.booklibrary.user.service.data.mapper.UserMapper;
import com.booklibrary.user.service.data.ports.input.UserService;
import com.booklibrary.user.service.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }


    @Override
    public UserDto createUser(UserDto userDto) {

        this.userRepository.findByEmail(userDto.getEmail()).ifPresent(user -> {
            throw new UserDomainException(
                    String.format("User is already in exist with this email: %s", userDto.getEmail()));
        });

        this.userRepository.findByPhoneNumber(userDto.getPhoneNumber()).ifPresent(user -> {
            throw new UserDomainException(
                    String.format("User is already in exist with this phoneNumber: %s", userDto.getPhoneNumber()));
        });

        this.userRepository.findByUserName(userDto.getUserName()).ifPresent(user -> {
            throw new UserDomainException(
                    String.format("User is already in exist with this userNumber: %s", userDto.getUserName()));
        });

        UserEntity userEntity = userRepository.save(userMapper.mapUserDtoToUserEntity(userDto));
        return userMapper.mapUserEntityToUserDto(userEntity);
    }

    @Override
    public List<UserDto> findAllUsers() {
        return this.userRepository.findAll()
                .stream()
                .map(this.userMapper::mapUserEntityToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto findById(String id) {
        return this.userRepository.findById(UUID.fromString(id))
                .map(userMapper::mapUserEntityToUserDto)
                .orElseThrow(() -> new UserNotFoundException(String.format("No user found with the provided ID: %s", id)));
    }
}
