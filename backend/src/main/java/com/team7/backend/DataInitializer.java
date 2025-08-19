package com.team7.backend;

import com.team7.backend.entities.Product;
import com.team7.backend.entities.StockChange;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.ProductRepository;
import com.team7.backend.repositories.StockChangeRepository;
import com.team7.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final StockChangeRepository stockChangeRepository;
  private final PasswordEncoder passwordEncoder;

  public DataInitializer(UserRepository userRepository,
                         ProductRepository productRepository,
                         StockChangeRepository stockChangeRepository,
                         PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.stockChangeRepository = stockChangeRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) throws Exception {

    // ---------- Users ----------
    if (userRepository.count() == 0) {
      User admin = new User(
        "admin@example.com",
        passwordEncoder.encode("admin123"),
        "Admin User",
        "ADMIN",
        "1234567890"
      );

      User staff1 = new User(
        "staff1@example.com",
        passwordEncoder.encode("staff123"),
        "Staff One",
        "USER",
        "1111111111"
      );

      User staff2 = new User(
        "staff2@example.com",
        passwordEncoder.encode("staff123"),
        "Staff Two",
        "USER",
        "2222222222"
      );

      userRepository.save(admin);
      userRepository.save(staff1);
      userRepository.save(staff2);
    }

    // ---------- Products ----------
    if (productRepository.count() == 0) {
      Product laptop = new Product("Laptop", "SKU001", "Electronics", "Gaming laptop",
        new BigDecimal("1200.00"), 2, 3, ""); // already low stock
      Product mouse = new Product("Mouse", "SKU002", "Electronics", "Wireless mouse",
        new BigDecimal("25.00"), 50, 5, ""); // plenty in stock
      Product chair = new Product("Chair", "SKU003", "Furniture", "Ergonomic chair",
        new BigDecimal("150.00"), 1, 2, ""); // below threshold
      Product desk = new Product("Desk", "SKU004", "Furniture", "Standing desk",
        new BigDecimal("400.00"), 12, 2, ""); // healthy stock
      Product printer = new Product("Printer", "SKU005", "Electronics", "Laser printer",
        new BigDecimal("200.00"), 8, 1, ""); // right on edge

      productRepository.save(laptop);
      productRepository.save(mouse);
      productRepository.save(chair);
      productRepository.save(desk);
      productRepository.save(printer);
    }

    // ---------- Stock Changes ----------
    if (stockChangeRepository.count() == 0) {
      User admin = userRepository.findByEmail("admin@example.com").orElseThrow();
      User staff1 = userRepository.findByEmail("staff1@example.com").orElseThrow();
      User staff2 = userRepository.findByEmail("staff2@example.com").orElseThrow();

      Product laptop = productRepository.findBySku("SKU001").orElseThrow();
      Product mouse = productRepository.findBySku("SKU002").orElseThrow();
      Product chair = productRepository.findBySku("SKU003").orElseThrow();

      StockChange change1 = new StockChange(laptop, 5, "Initial stock", admin);
      StockChange change2 = new StockChange(mouse, 50, "Purchase from supplier", staff1);
      StockChange change3 = new StockChange(chair, -1, "Sold one chair", staff2);
      StockChange change4 = new StockChange(laptop, -3, "Customer order", staff1);
      StockChange change5 = new StockChange(mouse, -2, "Correction (damaged items)", admin);

      stockChangeRepository.save(change1);
      stockChangeRepository.save(change2);
      stockChangeRepository.save(change3);
      stockChangeRepository.save(change4);
      stockChangeRepository.save(change5);
    }
  }
}
