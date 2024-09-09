package com.f1reactiontime.dto;

import jakarta.validation.constraints.NotNull;

public class TimerDTO {

    private Long id;

    @NotNull
    private Long userId;

    public Long getTime() {
        return time;
    }

    @NotNull
    private Long time;

}
