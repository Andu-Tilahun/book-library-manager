package com.booklibrary.user.service.application.controller;

import com.booklibrary.application.api.RequestBean;
import com.booklibrary.application.api.Response;
import com.booklibrary.user.service.application.entity.IAMUser;
import com.booklibrary.user.service.application.service.IAMService;
import com.booklibrary.user.service.data.dto.UserDto;
import com.booklibrary.user.service.data.entity.Gender;
import com.booklibrary.user.service.data.entity.Role;
import com.booklibrary.user.service.data.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api")
@Slf4j
public class AuthController {

    public static final String MIDDLE_NAME = "middleName";
    public static final String PHONE_NUMBER = "phoneNumber";
    public static final String GENDER = "gender";

    public static final String ROLE = "role";

    private final UserService userService;
    private final IAMService iamService;
    private final RequestBean requestBean;

    public AuthController(UserService userService, IAMService iamService, RequestBean requestBean) {
        this.userService = userService;
        this.iamService = iamService;
        this.requestBean = requestBean;
    }

    @GetMapping("auth/init")
    public Response<AuthInitResponse> getUserDetails() {
        AuthInitResponse initResponse = buildUserDetail();
        Response<AuthInitResponse> response = new Response(initResponse);
        return response;
    }

    @GetMapping("auth/token")
    public ResponseEntity<Map> generateToken(@RequestParam("grant_type") String grantType,
                                             @RequestParam("client_id") String clientId,
                                             @RequestParam("client_secret") String clientSecret) {
        return iamService.generateToken(grantType, clientId, clientSecret);
    }

    private AuthInitResponse buildUserDetail() {
        if (StringUtils.hasText(requestBean.getUserId())) {
            String csrfToken = requestBean.getCsrfToken();

            UserDto userDto = null;
            UUID userId = UUID.fromString(requestBean.getUserId());
            Optional<UserDto> optionalUser = userService.findById(String.valueOf(userId));

            if (optionalUser.isEmpty()) {
                userDto = new UserDto();
                userDto.setId(userId);
                IAMUser iamUser = iamService.getUserByUserId(requestBean.getUserId());

                userDto.setFirstName(iamUser.getFirstName());
                userDto.setLastName(iamUser.getLastName());
                userDto.setUserName(iamUser.getUsername());
                userDto.setEmail(iamUser.getEmail());

                JSONObject attributes = iamUser.getAttributes();
                if (attributes != null) {
                    if (attributes.containsKey(MIDDLE_NAME)) {
                        ArrayList middleNameList = (ArrayList) attributes.get(MIDDLE_NAME);
                        if (!CollectionUtils.isEmpty(middleNameList)) {
                            userDto.setMiddleName((String) middleNameList.get(0));
                        }
                    }
                    if (attributes.containsKey(PHONE_NUMBER)) {
                        ArrayList phoneNumberMap = (ArrayList) attributes.get(PHONE_NUMBER);
                        if (!CollectionUtils.isEmpty(phoneNumberMap)) {
                            userDto.setPhoneNumber((String) phoneNumberMap.get(0));
                        }
                    }
                    if (attributes.containsKey(GENDER)) {
                        ArrayList genderMap = (ArrayList) attributes.get(GENDER);
                        if (!CollectionUtils.isEmpty(genderMap)) {
                            userDto.setGender(Gender.valueOf(genderMap.get(0).toString()));
                        }
                    }
                    if (attributes.containsKey(ROLE)) {
                        ArrayList roleMap = (ArrayList) attributes.get(ROLE);
                        if (!CollectionUtils.isEmpty(roleMap)) {
                            userDto.setRole(Role.valueOf(roleMap.get(0).toString()));
                        }
                    }

                }

                UserDto result = userService.createUser(userDto);

            } else {
                userDto = optionalUser.get();
            }

            //Clear out profile image and password prior to returning
            userDto.setPassword(null);
            //userEntity.setProfilePicture(null);

            return new AuthInitResponse(userDto, csrfToken);

        } else {
            log.warn("Unauthenticated call reaches auth-init");
        }

        return null;
    }

    public record AuthInitResponse(
            UserDto user,
            String csrfToken
    ) {
    }
}
