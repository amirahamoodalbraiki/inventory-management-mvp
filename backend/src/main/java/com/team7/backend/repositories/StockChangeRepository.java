package com.team7.backend.repositories;

import com.team7.backend.entities.StockChange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockChangeRepository extends JpaRepository<StockChange, Integer> {

  // Find all stock changes for a product
  List<StockChange> findByProductId(Integer productId);

  // Find all stock changes made by a specific user
  List<StockChange> findByChangedById(Integer userId);
}
