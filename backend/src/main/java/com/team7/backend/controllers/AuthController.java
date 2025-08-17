package com.team7.backend.controllers;

import com.team7.backend.dtos.AuthResponse;
import com.team7.backend.dtos.LoginRequest;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.UserRepository;
import com.team7.backend.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody(required = false) LoginRequest request) {
    // 1️⃣ Check if request body exists
    if (request == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("Request body is missing. Please send JSON with email and password.");
    }

    // 2️⃣ Validate email and password
    String email = request.getEmail();
    String password = request.getPassword();

    if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("Missing credentials. Both email and password are required.");
    }

    // 3️⃣ Fetch user safely
    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body("Invalid credentials");
    }

    // 4️⃣ Generate token for valid user
    String token = jwtService.generateToken(
      user.getEmail(),       // subject (username/email)
      user.getRole(),        // role claim
      user.getId()           // userId claim
    );

    return ResponseEntity.ok(new AuthResponse(token));
  }
}
