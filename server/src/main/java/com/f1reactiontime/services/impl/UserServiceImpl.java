package com.f1reactiontime.services.impl;

import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;
import com.f1reactiontime.models.User;
import com.f1reactiontime.repositories.UserRepository;
import com.f1reactiontime.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createUser(UserRegistrationDTO userRegistrationDTO) {
        User user = new User();
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setRole(true);
        User savedUser = userRepository.save(user);
        return toDTO(savedUser);
    }


    private UserDTO toDTO(User user){
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
