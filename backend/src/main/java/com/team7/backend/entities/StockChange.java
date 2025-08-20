package com.team7.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "stock_changes")
public class StockChange {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  // Link to Product
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  private Integer changeAmount;

  private String reason;

  // Link to User who made the change
  @ManyToOne
  @JoinColumn(name = "changed_by", nullable = false)
  private User changedBy;

  private String createdAt = LocalDateTime.now()
    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

  public StockChange() {}

  public StockChange(Product product, Integer changeAmount, String reason, User changedBy) {
    this.product = product;
    this.changeAmount = changeAmount;
    this.reason = reason;
    this.changedBy = changedBy;
    this.createdAt =LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
  }

  // Getters & Setters
  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }

  public Product getProduct() { return product; }
  public void setProduct(Product product) { this.product = product; }

  public Integer getChangeAmount() { return changeAmount; }
  public void setChangeAmount(Integer changeAmount) { this.changeAmount = changeAmount; }

  public String getReason() { return reason; }
  public void setReason(String reason) { this.reason = reason; }

  public User getChangedBy() { return changedBy; }
  public void setChangedBy(User changedBy) { this.changedBy = changedBy; }

  public String getCreatedAt() { return createdAt; }
  public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
