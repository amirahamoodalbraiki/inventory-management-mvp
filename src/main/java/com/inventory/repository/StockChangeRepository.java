package com.inventory.repository;

import com.inventory.entity.StockChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockChangeRepository extends JpaRepository<StockChange, Long> {
    // Custom methods can be added here when needed
}
