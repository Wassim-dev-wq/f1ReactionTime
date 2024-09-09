package com.f1reactiontime.services;

import com.f1reactiontime.dto.UserDTO;
import com.f1reactiontime.dto.UserRegistrationDTO;


public interface UserService {

    UserDTO createUser(UserRegistrationDTO userRegistrationDTO);
}
