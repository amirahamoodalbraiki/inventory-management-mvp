package com.team7.backend;

import com.team7.backend.entities.Product;
import com.team7.backend.entities.StockChange;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.ProductRepository;
import com.team7.backend.repositories.StockChangeRepository;
import com.team7.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final StockChangeRepository stockChangeRepository;

  public DataInitializer(UserRepository userRepository,
                         ProductRepository productRepository,
                         StockChangeRepository stockChangeRepository) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.stockChangeRepository = stockChangeRepository;
  }

  @Override
  public void run(String... args) throws Exception {

    // ---------- Users ----------
    if (userRepository.count() == 0) {
      User admin = new User("admin@example.com", "hashedpassword", "Admin User", "ADMIN", "1234567890");
      User user = new User("user@example.com", "hashedpassword", "Normal User", "USER", "0987654321");
      userRepository.save(admin);
      userRepository.save(user);
    }

    // ---------- Products ----------
    if (productRepository.count() == 0) {
      Product laptop = new Product("Laptop", "SKU001", "Electronics", "Gaming laptop",
        new BigDecimal("1200.00"), 10, 2, "");
      Product mouse = new Product("Mouse", "SKU002", "Electronics", "Wireless mouse",
        new BigDecimal("25.00"), 50, 5, "");
      productRepository.save(laptop);
      productRepository.save(mouse);
    }

    // ---------- Stock Changes ----------
    if (stockChangeRepository.count() == 0) {
      User admin = userRepository.findById(1).orElseThrow();
      Product laptop = productRepository.findById(1).orElseThrow();
      Product mouse = productRepository.findById(2).orElseThrow();

      StockChange change1 = new StockChange(laptop, 10, "Initial stock", admin);
      StockChange change2 = new StockChange(mouse, 50, "Initial stock", admin);

      stockChangeRepository.save(change1);
      stockChangeRepository.save(change2);
    }
  }
}
