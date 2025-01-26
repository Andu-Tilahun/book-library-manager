package com.booklibrary.user.service.data.dto;

import com.booklibrary.user.service.data.entity.Gender;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private UUID id;
    private String firstName;
    private String middleName;
    private String lastName;
    private Gender gender;
    private String phoneNumber;
    private String profilePicture;
    private String userName;
    private String email;
    private String password;
}
