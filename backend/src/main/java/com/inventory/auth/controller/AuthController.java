package com.inventory.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // Mock token for testing frontend flow
        String mockJwt = "mock-jwt-token-for-" + email;

        return ResponseEntity.ok(Map.of("token", mockJwt));
    }
}
