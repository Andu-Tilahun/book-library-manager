package com.booklibrary.user.service.data.entity;

import com.booklibrary.data.entity.AuditableEntity;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", schema = "bms_user_local")
@Entity
public class UserEntity extends AuditableEntity {
    @Id
    private UUID id;
    private String firstName;
    private String middleName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(unique = true, nullable = false)
    private String phoneNumber;
    private String profilePicture;
    @Column(unique = true, nullable = false)
    private String userName;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
}
