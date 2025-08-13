package com.team7.backend.services;

import com.team7.backend.entities.Product;
import com.team7.backend.entities.StockChange;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.ProductRepository;
import com.team7.backend.repositories.StockChangeRepository;
import com.team7.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockChangeService {

  private final StockChangeRepository stockChangeRepository;
  private final ProductRepository productRepository;
  private final UserRepository userRepository;

  public StockChangeService(StockChangeRepository stockChangeRepository,
                            ProductRepository productRepository,
                            UserRepository userRepository) {
    this.stockChangeRepository = stockChangeRepository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }

  public List<StockChange> getAllStockChanges() {
    return stockChangeRepository.findAll();
  }

  public StockChange addStockChange(Integer productId, Integer changeAmount, String reason, Integer userId) {
    Product product = productRepository.findById(productId).orElseThrow();
    User user = userRepository.findById(userId).orElseThrow();

    // Adjust product quantity
    product.setQuantity(product.getQuantity() + changeAmount);
    productRepository.save(product);

    // Create stock change record
    StockChange stockChange = new StockChange(product, changeAmount, reason, user);
    return stockChangeRepository.save(stockChange);
  }

  public List<StockChange> getChangesForProduct(Integer productId) {
    return stockChangeRepository.findByProductId(productId);
  }
}
