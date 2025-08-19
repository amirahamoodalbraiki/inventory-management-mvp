package com.team7.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // The user who should see the notification (e.g., Admin/Staff)
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

  @Column(nullable = false)
  private String type; // e.g., "LOW_STOCK"

  @Column(nullable = false)
  private String message;

  @Column(nullable = false)
  private LocalDateTime sentAt;

  private boolean read = false; // for frontend (optional)

  // Constructors
  public Notification() {}

  public Notification(User user, Product product, String type, String message) {
    this.user = user;
    this.product = product;
    this.type = type;
    this.message = message;
    this.sentAt = LocalDateTime.now();
    this.read = false;
  }

  // Getters & Setters ...
}

