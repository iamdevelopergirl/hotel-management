package com.agoda.hotelmanagementapp;

import com.agoda.models.User;
import com.agoda.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepo userRepo;

    @Autowired
    public DatabaseLoader(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.userRepo.save(new User(123, "manager", "password"));
    }
}