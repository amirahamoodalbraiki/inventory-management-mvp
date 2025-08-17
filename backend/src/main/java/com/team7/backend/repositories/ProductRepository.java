package com.team7.backend.repositories;

import com.team7.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  // Example custom queries
  List<Product> findByCategory(String category);
  List<Product> findByQuantityLessThanEqual(Integer quantity);
  List<Product> findByDeletedFalse();
}
