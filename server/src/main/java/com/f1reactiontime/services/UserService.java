package com.f1reactiontime.services;

import com.f1reactiontime.dto.AuthRequestDTO;
import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;

import java.util.List;


public interface UserService {

    UserDTO createUser(UserRegistrationDTO userRegistrationDTO);
    UserDTO getUserById(Long id);
}
