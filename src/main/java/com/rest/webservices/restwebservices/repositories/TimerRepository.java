package com.rest.webservices.restwebservices.repositories;

import com.rest.webservices.restwebservices.models.Timer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimerRepository extends JpaRepository<Timer, Long> {
    List<Timer> findByUserId(Long userId);
}
