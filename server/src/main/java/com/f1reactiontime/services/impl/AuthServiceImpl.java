package com.f1reactiontime.services.impl;


import com.f1reactiontime.dto.AuthRequestDTO;
import com.f1reactiontime.dto.AuthResponseDTO;
import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;
import com.f1reactiontime.exception.AuthenticationException;
import com.f1reactiontime.exception.UserAlreadyExistsException;
import com.f1reactiontime.repositories.UserRepository;
import com.f1reactiontime.security.JwtTokenProvider;
import com.f1reactiontime.services.AuthService;
import com.f1reactiontime.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository,
                           UserService userService,
                           AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public UserDTO registerUser(UserRegistrationDTO userRegistrationDTO) {
        if(userRepository.existsByEmail(userRegistrationDTO.getEmail())){
            throw new UserAlreadyExistsException("Email is already in use: " + userRegistrationDTO.getEmail());
        }
        return userService.createUser(userRegistrationDTO);
    }

    @Override
    public AuthResponseDTO authenticateUser(AuthRequestDTO authRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequestDTO.getEmail(),
                            authRequestDTO.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(authentication);
            return new AuthResponseDTO(jwt);
        } catch (Exception e) {
             throw new AuthenticationException("Authentication failed: " + e.getMessage());
        }
    }
}
