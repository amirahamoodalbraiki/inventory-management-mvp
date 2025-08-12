package com.inventory.auth.controller;

import com.inventory.auth.model.User;
import com.inventory.auth.service.AuthService;

public class AuthController {

    private AuthService authService = new AuthService();

    public String login(String email, String password) {
        boolean success = authService.login(email, password);
        if (success) {
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }

    public User register(User user) {
        return authService.register(user);
    }
}
