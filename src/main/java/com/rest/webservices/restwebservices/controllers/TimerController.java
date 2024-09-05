package com.rest.webservices.restwebservices.controllers;

import com.rest.webservices.restwebservices.models.Timer;
import com.rest.webservices.restwebservices.repositories.TimerRepository;
import com.rest.webservices.restwebservices.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timers")
public class TimerController {

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/submit-reaction-time")
    public ResponseEntity<Timer> submitReactionTime(@RequestBody Timer timer) {
        Timer newTimer = timerRepository.save(timer);
        return ResponseEntity.ok(newTimer);
    }

    @GetMapping("/get-reaction-times/{userId}")
    public ResponseEntity<List<Timer>> getUserReactionTimes(@PathVariable Long userId) {
        List<Timer> reactionTimes = timerRepository.findByUserId(userId);
        return ResponseEntity.ok(reactionTimes);
    }
}
