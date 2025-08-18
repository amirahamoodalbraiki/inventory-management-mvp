package com.team7.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String passwordHash;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String role; // 'ADMIN' or 'USER'

  @Column(nullable = true)
  private String phone;

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  // Constructors
  public User() {}

  public User(String email, String passwordHash, String name, String role, String phone) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.name = name;
    this.role = role.toUpperCase(); // enforce uppercase
    this.phone = phone;
    this.createdAt = LocalDateTime.now();
  }

  // Getters and Setters
  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getRole() { return role; }
  public void setRole(String role) { this.role = role.toUpperCase(); }

  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }

  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

  // Helper methods
  public boolean isAdmin() { return "ADMIN".equalsIgnoreCase(this.role); }
  public boolean isUser() { return "USER".equalsIgnoreCase(this.role); }
}
