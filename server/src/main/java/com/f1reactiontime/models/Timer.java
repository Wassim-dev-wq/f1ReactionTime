package com.f1reactiontime.models;

import jakarta.persistence.*;

@Entity
@Table(name= "timer")
public class Timer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Long time;

    public void setUser(User user) {
        this.user = user;
    }

    public void setTime(Long time) {
        this.time = time;
    }
}
