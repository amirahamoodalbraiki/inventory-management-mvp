package com.team7.backend.controllers;

import com.team7.backend.entities.User;
import com.team7.backend.repositories.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  // Get all users
  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // Get user by ID
  @GetMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public User getUserById(@PathVariable Integer id) {
    return userRepository.findById(id).orElse(null);
  }

  // Create new user
  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public User createUser(@RequestBody User user) {
    // 🔹 Hash the raw password before saving
    String rawPassword = user.getPasswordHash();
    user.setPasswordHash(passwordEncoder.encode(rawPassword));

    return userRepository.save(user);
  }

  // Delete user
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteUser(@PathVariable Integer id) {
    userRepository.deleteById(id);
  }
}
