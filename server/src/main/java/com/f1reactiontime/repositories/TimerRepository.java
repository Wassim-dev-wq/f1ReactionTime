package com.f1reactiontime.repositories;

import com.f1reactiontime.models.Timer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimerRepository extends JpaRepository<Timer, Long> {
    List<Timer> findByUserId(Long userId);
}
