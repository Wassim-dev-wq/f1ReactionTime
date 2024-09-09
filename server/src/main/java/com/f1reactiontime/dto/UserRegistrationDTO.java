package com.f1reactiontime.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserRegistrationDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is incorrect")
    private String email;

    @NotBlank(message = "Password is required")
     private String password;

    private Boolean role;

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

}
