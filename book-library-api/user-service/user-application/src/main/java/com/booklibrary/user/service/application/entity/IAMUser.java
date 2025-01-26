package com.booklibrary.user.service.application.entity;

import lombok.*;
import net.minidev.json.JSONObject;
import org.springframework.util.MultiValueMap;

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
    public String lastName;
    public Boolean enabled;
    public List<Credentials> credentials;
    private JSONObject attributes;
}
