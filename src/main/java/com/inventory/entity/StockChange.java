package com.inventory.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_changes")
public class StockChange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "old_quantity", nullable = false)
    private int oldQuantity;
    
    @Column(name = "new_quantity", nullable = false)
    private int newQuantity;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "change_type", nullable = false)
    private ChangeType changeType;
    
    private String reason;
    
    @Column(name = "changed_by", nullable = false)
    private Long changedBy;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public enum ChangeType {
        RESTOCK, SALE, ADJUSTMENT, RETURN
    }
    
    // Constructors
    public StockChange() {}
    
    // Getters and setters...
    // (Will add these if you need them)
}
