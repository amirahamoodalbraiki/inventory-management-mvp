package com.example.inventory.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/auth/hello")
    public String hello() {
        return "Hello from AuthController!";
    }
}
