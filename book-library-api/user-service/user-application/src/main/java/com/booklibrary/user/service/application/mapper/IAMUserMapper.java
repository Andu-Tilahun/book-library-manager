package com.booklibrary.user.service.application.mapper;

import com.booklibrary.user.service.application.entity.Credentials;
import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.data.dto.UserDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class IAMUserMapper {

    public IAMUser mapUserDtoToIAMUser(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        return IAMUser.builder()
                .id(String.valueOf(userDto.getId()))
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .username(userDto.getUserName())
                .email(userDto.getEmail())
                .enabled(true)
                .credentials(buildCredentials(userDto))
                .attributes(buildAttributes(userDto))
                .build();
    }

    private List<Credentials> buildCredentials(UserDto userDto) {
        List<Credentials> credentialsList = new ArrayList<>();
        Credentials credentials = new Credentials();
        credentials.setType("password");
        credentials.setValue(userDto.getPassword());
        credentials.setTemporary(true);
        credentialsList.add(credentials);
        return credentialsList;
    }

    private Map<String, Object> buildAttributes(UserDto userDto) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("middleName", userDto.getMiddleName());
        attributes.put("phoneNumber", userDto.getPhoneNumber());
        attributes.put("gender", userDto.getGender());
        attributes.put("profilePicture", userDto.getProfilePicture());
        return attributes;
    }


}
