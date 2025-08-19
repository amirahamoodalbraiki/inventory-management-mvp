package com.team7.backend.services;

import com.team7.backend.entities.Notification;
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
  private final NotificationService notificationService;

  public StockChangeService(StockChangeRepository stockChangeRepository,
                            ProductRepository productRepository,
                            UserRepository userRepository,
                            NotificationService notificationService) {
    this.stockChangeRepository = stockChangeRepository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  // Get all stock changes
  public List<StockChange> getAllStockChanges() {
    return stockChangeRepository.findAll();
  }

  // Add a stock change (USER and ADMIN can do this)
  public StockChange addStockChange(Integer productId, Integer changeAmount, String reason, Integer userId) {
    if (changeAmount == 0) {
      throw new IllegalArgumentException("Change amount cannot be zero");
    }

    Product product = productRepository.findById(productId)
      .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    User user = userRepository.findById(userId)
      .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Update product quantity
    int newQuantity = product.getQuantity() + changeAmount;
    product.setQuantity(newQuantity);
    productRepository.save(product);

    // Create and save stock change record
    StockChange stockChange = new StockChange(product, changeAmount, reason, user);
    stockChangeRepository.save(stockChange);

    // 🔔 Check for low stock and create notification
    if (newQuantity <= product.getLowStockThreshold()) {
      notificationService.createLowStockNotification(user, product);
    }

    return stockChange;
  }

  // Get stock changes for a specific product
  public List<StockChange> getChangesForProduct(Integer productId) {
    return stockChangeRepository.findByProductId(productId);
  }
}
