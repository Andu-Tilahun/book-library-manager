package com.booklibrary.user.service.application.entity;

import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IAMUser {
    public String id;
    public String email;
    public String username;
    public String firstName;
    public String middleName;
    public String lastName;
    public Boolean enabled;
    public List<Credentials> credentials;
    private Map<String, Object> attributes;
}
