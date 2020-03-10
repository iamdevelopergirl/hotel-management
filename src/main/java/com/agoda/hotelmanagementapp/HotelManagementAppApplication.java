package com.agoda.hotelmanagementapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com.agoda")
@EnableJpaRepositories("com.agoda.repositories")
@EntityScan("com.agoda.models")
public class HotelManagementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelManagementAppApplication.class, args);
	}

}
