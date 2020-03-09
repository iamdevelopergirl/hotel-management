package com.agoda.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
public class BasicAuthController {

    @GetMapping(path = "/login")
    public AuthBean helloWorldBean() {
        return new AuthBean("Login success for user");
    }
}
