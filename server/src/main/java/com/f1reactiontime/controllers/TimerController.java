package com.f1reactiontime.controllers;

import com.f1reactiontime.dto.TimerDTO;
import com.f1reactiontime.models.Timer;
import com.f1reactiontime.repositories.TimerRepository;
import com.f1reactiontime.services.TimerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timers")
@CrossOrigin(origins = "http://localhost:3000")
public class TimerController {

    private final TimerService timerService;

    private final TimerRepository timerRepository;

    public TimerController(TimerService timerService, TimerRepository timerRepository) {
        this.timerService = timerService;
        this.timerRepository = timerRepository;
    }

    @PostMapping("/submit-reaction-time")
    public ResponseEntity<Timer> submitReactionTime(@RequestBody TimerDTO timerDTO, Authentication authentication) {
        String userEmail = authentication.getName();
        Timer savedTimer = timerService.saveTimer(userEmail, timerDTO.getTime());
        return ResponseEntity.ok(savedTimer);
    }

    @GetMapping("/get-reaction-times/{userId}")
    public ResponseEntity<List<Timer>> getUserReactionTimes(@PathVariable Long userId) {
        List<Timer> reactionTimes = timerRepository.findByUserId(userId);
        return ResponseEntity.ok(reactionTimes);
    }
}
