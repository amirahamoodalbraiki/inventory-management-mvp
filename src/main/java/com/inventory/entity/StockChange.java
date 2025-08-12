package com.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_changes")
@Getter @Setter
public class StockChange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "old_quantity", nullable = false)
    private int oldQuantity;

    @Column(name = "new_quantity", nullable = false)
    private int newQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "change_type", nullable = false, length = 20)
    private ChangeType changeType;

    @Column(length = 500)
package com.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_changes")
@Getter @Setter
public class StockChange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "old_quantity", nullable = false)
    private int oldQuantity;

    @Column(name = "new_quantity", nullable = false)
    private int newQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "change_type", nullable = false, length = 20)
    private ChangeType changeType;

    @Column(length = 500)
    private String reason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by", nullable = false)
    private User changedBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public StockChange() {}

    public StockChange(Product product, int oldQuantity, int newQuantity, 
                      ChangeType changeType, User changedBy) {
        this.product = product;
        this.oldQuantity = oldQuantity;
        this.newQuantity = newQuantity;
        this.changeType = changeType;
        this.changedBy = changedBy;
    }

    public enum ChangeType {
        RESTOCK, SALE, ADJUSTMENT, RETURN
    }

    // toString() for logging/debugging
    @Override
    public String toString() {
        return "StockChange{" +
               "id=" + id +
               ", product=" + product.getId() +
               ", changeType=" + changeType +
               ", changedBy=" + changedBy.getId() +
               '}';
    }
}



    
