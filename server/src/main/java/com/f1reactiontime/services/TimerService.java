package com.f1reactiontime.services;

import com.f1reactiontime.models.Timer;

public interface TimerService {
     Timer saveTimer(String userEmail, Long time);
}
