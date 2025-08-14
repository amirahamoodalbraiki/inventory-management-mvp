package com.example.inventory.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(name="password_hash", nullable=false)
    private String passwordHash;

    private String name;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name="created_at")
    private Instant createdAt = Instant.now();

    // Getters and setters omitted for brevity
}
