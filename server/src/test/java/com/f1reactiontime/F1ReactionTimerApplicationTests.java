package com.f1reactiontime;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class F1ReactionTimerApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        assertNotNull(applicationContext, "Application context should not be null");
    }

    @Test
    void mainMethodShouldLoad() {
        F1ReactionTimerApplication.main(new String[]{});
    }

}