package com.agoda.services;

import com.agoda.models.User;
import com.agoda.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public User addUser(User user){
        user = userRepo.save(user);
        return user;
    }

    public User getUserById(Integer id){
        return userRepo.getOne(id);
    }
}
