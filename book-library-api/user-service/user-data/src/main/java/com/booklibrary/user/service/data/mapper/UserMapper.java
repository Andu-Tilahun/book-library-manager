package com.booklibrary.user.service.data.mapper;

import com.booklibrary.user.service.data.dto.UserDto;
import com.booklibrary.user.service.data.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserEntity mapUserDtoToUserEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        return UserEntity.builder()
                .id(userDto.getId())
                .firstName(userDto.getFirstName())
                .middleName(userDto.getMiddleName())
                .lastName(userDto.getLastName())
                .gender(userDto.getGender())
                .role(userDto.getRole())
                .phoneNumber(userDto.getPhoneNumber())
                .profilePicture(userDto.getProfilePicture())
                .userName(userDto.getUserName())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }

    public UserDto mapUserEntityToUserDto(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }
        return UserDto.builder()
                .id(userEntity.getId())
                .firstName(userEntity.getFirstName())
                .middleName(userEntity.getMiddleName())
                .lastName(userEntity.getLastName())
                .gender(userEntity.getGender())
                .role(userEntity.getRole())
                .phoneNumber(userEntity.getPhoneNumber())
                .profilePicture(userEntity.getProfilePicture())
                .userName(userEntity.getUserName())
                .email(userEntity.getEmail())
                .build();
    }
}
