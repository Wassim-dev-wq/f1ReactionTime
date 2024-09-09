package com.f1reactiontime.dto;

public class AuthResponseDTO {
    private String token;
    private String tokenType = "Bearer";

    public AuthResponseDTO(String token) {
        this.token = token;
    }


}