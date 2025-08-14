package com.team7.backend.controllers;

import com.team7.backend.dtos.AuthResponse;
import com.team7.backend.dtos.LoginRequest;
import com.team7.backend.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final JwtService jwtService;

  public AuthController(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Dummy authentication — replace with real user validation
    if ("user".equals(request.getUsername()) && "pass".equals(request.getPassword())) {
      String token = jwtService.generateToken(request.getUsername());
      return ResponseEntity.ok(new AuthResponse(token));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
  }
}
