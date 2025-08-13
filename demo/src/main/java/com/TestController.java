package com.team_7.project.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Hello! Your Spring Boot app is running!";
    }

    @GetMapping("/api/test")
    public String testEndpoint() {
        return "Test endpoint is working!";
    }
}
