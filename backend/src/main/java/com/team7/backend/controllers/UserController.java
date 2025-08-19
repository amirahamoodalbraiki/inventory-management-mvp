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

  // 🔹 Only ADMIN can see all users
  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // 🔹 Only ADMIN can get user by ID
  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public User getUserById(@PathVariable Integer id) {
    return userRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }

  // 🔹 Only ADMIN can create users
  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public User createUser(@RequestBody User user) {
    // Hash the raw password before saving
    String rawPassword = user.getPasswordHash();
    user.setPasswordHash(passwordEncoder.encode(rawPassword));

    // Ensure role is uppercase and valid
    String role = user.getRole().toUpperCase();
    if (!role.equals("ADMIN") && !role.equals("USER")) {
      throw new IllegalArgumentException("Role must be ADMIN or USER");
    }
    user.setRole(role);

    return userRepository.save(user);
  }

  // 🔹 Only ADMIN can update users
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public User updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
    return userRepository.findById(id)
      .map(user -> {
        user.setEmail(updatedUser.getEmail());
        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());

        // ✅ If password is provided, hash it before saving
        if (updatedUser.getPasswordHash() != null && !updatedUser.getPasswordHash().isBlank()) {
          user.setPasswordHash(passwordEncoder.encode(updatedUser.getPasswordHash()));
        }

        // ✅ Validate and set role (ADMIN or USER)
        if (updatedUser.getRole() != null) {
          String role = updatedUser.getRole().toUpperCase();
          if (!role.equals("ADMIN") && !role.equals("USER")) {
            throw new IllegalArgumentException("Role must be ADMIN or USER");
          }
          user.setRole(role);
        }

        return userRepository.save(user);
      })
      .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }


  // 🔹 Only ADMIN can delete users
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteUser(@PathVariable Integer id) {
    if (!userRepository.existsById(id)) {
      throw new RuntimeException("User not found with id: " + id);
    }
    userRepository.deleteById(id);
  }
}
