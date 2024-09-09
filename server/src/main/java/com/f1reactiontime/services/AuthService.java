package com.f1reactiontime.services;

import com.f1reactiontime.dto.AuthRequestDTO;
import com.f1reactiontime.dto.AuthResponseDTO;
import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;

public interface AuthService {
    UserDTO registerUser(UserRegistrationDTO userRegistrationDTO);
    AuthResponseDTO authenticateUser(AuthRequestDTO authRequestDTO);
}
