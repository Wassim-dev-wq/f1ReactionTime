package com.f1reactiontime.controllers;

import com.f1reactiontime.dto.AuthRequestDTO;
import com.f1reactiontime.dto.AuthResponseDTO;
import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;
import com.f1reactiontime.services.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) {
        logger.info("Received registration request for email: {}", userRegistrationDTO.getEmail());
        try {
            UserDTO registeredUser = authService.registerUser(userRegistrationDTO);
            logger.info("Successfully registered user with email: {}", registeredUser.getEmail());
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            logger.error("Error during user registration", e);
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticateUser(@Valid @RequestBody AuthRequestDTO authRequestDTO){
            return ResponseEntity.ok(authService.authenticateUser(authRequestDTO));
    }
}
