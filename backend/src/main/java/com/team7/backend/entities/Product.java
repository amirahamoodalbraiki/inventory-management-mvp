package com.team7.backend.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String sku;

  @Column(nullable = false)
  private String category;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal unitPrice;

  @Column(nullable = false)
  private Integer quantity;

  @Column(nullable = false)
  private Integer lowStockThreshold;

  private String imageUrl;

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(nullable = false)
  private boolean deleted = false;

  public boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(boolean deleted) {
    this.deleted = deleted;
  }

  // Constructors
  public Product() {}

  public Product(String name, String sku, String category, String description, BigDecimal unitPrice, Integer quantity, Integer lowStockThreshold, String imageUrl) {
    this.name = name;
    this.sku = sku;
    this.category = category;
    this.description = description;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.lowStockThreshold = lowStockThreshold;
    this.imageUrl = imageUrl;
    this.createdAt = LocalDateTime.now();
  }

  // Getters & Setters
  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getSku() { return sku; }
  public void setSku(String sku) { this.sku = sku; }

  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public BigDecimal getUnitPrice() { return unitPrice; }
  public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

  public Integer getQuantity() { return quantity; }
  public void setQuantity(Integer quantity) { this.quantity = quantity; }

  public Integer getLowStockThreshold() { return lowStockThreshold; }
  public void setLowStockThreshold(Integer lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }

  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

