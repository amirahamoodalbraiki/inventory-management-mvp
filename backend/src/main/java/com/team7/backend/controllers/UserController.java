package com.team7.backend.controllers;

import com.team7.backend.entities.User;
import com.team7.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // Get all users
  @GetMapping
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // Get user by ID
  @GetMapping("/{id}")
  public User getUserById(@PathVariable Integer id) {
    return userRepository.findById(id).orElse(null);
  }

  // Create new user
  @PostMapping
  public User createUser(@RequestBody User user) {
    return userRepository.save(user);
  }

  // Delete user
  @DeleteMapping("/{id}")
  public void deleteUser(@PathVariable Integer id) {
    userRepository.deleteById(id);
  }
}
