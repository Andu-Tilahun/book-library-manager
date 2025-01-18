package com.booklibrary.user.service.application.entity;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Credentials {
    String type;
    String value;
    Boolean temporary;
}
