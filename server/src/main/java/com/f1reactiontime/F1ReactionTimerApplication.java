package com.f1reactiontime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.f1reactiontime.models")
@EnableJpaRepositories("com.f1reactiontime.repositories")
public class F1ReactionTimerApplication {
	public static void main(String[] args) {
		SpringApplication.run(F1ReactionTimerApplication.class, args);
	}

}
