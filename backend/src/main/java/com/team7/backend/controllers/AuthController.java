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

import java.util.Optional;

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
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    User user = userRepository.findByEmail(request.getUsername())
      .orElse(null);

    if (user != null && passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
      String token = jwtService.generateToken(user.getEmail());
      return ResponseEntity.ok(new AuthResponse(token));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
  }
}
