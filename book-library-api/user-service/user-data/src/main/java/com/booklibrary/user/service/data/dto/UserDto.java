package com.booklibrary.user.service.data.dto;

import com.booklibrary.user.service.data.entity.Gender;
import com.booklibrary.user.service.data.entity.Role;
import com.booklibrary.user.service.data.exception.UserValidationException;
import lombok.*;

import java.util.UUID;
import java.util.regex.Pattern;

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

    private Role role;
    private String phoneNumber;
    private String profilePicture;
    private String userName;
    private String email;
    private String password;

    public void validate() {
        if (firstName == null || firstName.trim().isEmpty()) {
            throw new UserValidationException("First name is required");
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            throw new UserValidationException("Last name is required");
        }
        if (gender == null) {
            throw new UserValidationException("Gender is required");
        }
        if (role == null) {
            throw new UserValidationException("Role is required");
        }
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            throw new UserValidationException("Phone number is required");
        }
        if (userName == null || userName.trim().isEmpty()) {
            throw new UserValidationException("Username is required");
        }
        if (email == null || !isValidEmail(email)) {
            throw new UserValidationException("Invalid email format");
        }
        if (password == null || !isStrongPassword(password)) {
            throw new UserValidationException("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number");
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    private boolean isStrongPassword(String password) {
        String passwordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }
}
