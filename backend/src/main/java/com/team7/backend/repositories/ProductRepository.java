package com.team7.backend.repositories;

import com.team7.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  // Only active (not deleted) products
  List<Product> findByDeletedFalse();

  // Find product by SKU
  Optional<Product> findBySku(String sku);
}

