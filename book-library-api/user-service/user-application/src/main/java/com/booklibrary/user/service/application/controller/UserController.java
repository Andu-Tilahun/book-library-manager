package com.booklibrary.user.service.application.controller;

import com.booklibrary.application.api.Response;
import com.booklibrary.application.util.CorrelationIdGenerator;
import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.application.service.IAMService;
import com.booklibrary.user.service.data.dto.UserDto;
import com.booklibrary.user.service.data.ports.input.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping(value = "/user/user", produces = "application/vnd.api.v1+json")
public class UserController {

    private final IAMService iamService;

    private final UserService userService;

    private final int passWordStrength = 10;

    public UserController(IAMService iamService, UserService userService) {
        this.iamService = iamService;
        this.userService = userService;
    }

    @PostMapping
    public Response createUser(@RequestBody UserDto userDto,
                               HttpServletRequest request) throws IOException {
        userDto.validate();
        //Call minIo
        iamService.addUser(userDto);
        IAMUser iamUser = iamService.getUserByUserName(userDto.getUserName());
        userDto.setId(UUID.fromString(iamUser.getId()));
        userDto.setPassword(encodePassword(userDto.getPassword()));
        UserDto result = userService.createUser(userDto);
        return Response.builder()
                .data(result)
                .correlationId(CorrelationIdGenerator.getCorrelationId(request))
                .message("User Created Successfully")
                .build();
    }

    private String encodePassword(String passWord) {
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(passWordStrength, new SecureRandom());
        return bCryptPasswordEncoder.encode(passWord);
    }

    @GetMapping
    public String testUser() {
        return "working...";
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        return ResponseEntity.ok("uploaded");
    }
}
