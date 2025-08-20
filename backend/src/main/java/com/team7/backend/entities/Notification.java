package com.team7.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private String type;

  @Column(nullable = false)
  private String message;

  @Column(nullable = false)
  private LocalDateTime sentAt = LocalDateTime.now();

  private boolean read = false;

  public Notification() {}

  public Notification(User user, Product product, String type, String message) {
    this.user = user;
    this.product = product;
    this.type = type;
    this.message = message;
    this.sentAt = LocalDateTime.now();
    this.read = false;
  }

  // Getters and setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }

  public Product getProduct() { return product; }
  public void setProduct(Product product) { this.product = product; }

  public String getType() { return type; }
  public void setType(String type) { this.type = type; }

  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }

  public LocalDateTime getSentAt() { return sentAt; }
  public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

  public boolean isRead() { return read; }
  public void setRead(boolean read) { this.read = read; }
}
