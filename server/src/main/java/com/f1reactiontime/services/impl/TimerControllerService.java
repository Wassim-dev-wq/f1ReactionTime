package com.f1reactiontime.services.impl;

import com.f1reactiontime.models.Timer;
import com.f1reactiontime.models.User;
import com.f1reactiontime.repositories.TimerRepository;
import com.f1reactiontime.repositories.UserRepository;
import com.f1reactiontime.services.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimerControllerService implements TimerService {

    private final TimerRepository timerRepository;

    private final UserRepository userRepository;

    @Autowired
    public TimerControllerService(TimerRepository timerRepository,
                                  UserRepository userRepository){
        this.timerRepository = timerRepository;
        this.userRepository = userRepository;
    }
    public Timer saveTimer(String userEmail, Long time) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Timer timer = new Timer();
        timer.setUser(user);
        timer.setTime(time);

        return timerRepository.save(timer);
    }
}
