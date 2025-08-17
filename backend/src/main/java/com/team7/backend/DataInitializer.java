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

      User user = new User(
        "user@example.com",
        passwordEncoder.encode("user123"),
        "Normal User",
        "USER",
        "0987654321"
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

      User manager = new User(
        "manager@example.com",
        passwordEncoder.encode("manager123"),
        "Manager User",
        "USER",
        "3333333333"
      );

      User supervisor = new User(
        "supervisor@example.com",
        passwordEncoder.encode("super123"),
        "Supervisor User",
        "USER",
        "4444444444"
      );

      User guest = new User(
        "guest@example.com",
        passwordEncoder.encode("guest123"),
        "Guest User",
        "USER",
        "5555555555"
      );

      userRepository.save(admin);
      userRepository.save(user);
      userRepository.save(staff1);
      userRepository.save(staff2);
      userRepository.save(manager);
      userRepository.save(supervisor);
      userRepository.save(guest);
    }

    // ---------- Products ----------
    if (productRepository.count() == 0) {
      Product laptop = new Product("Laptop", "SKU001", "Electronics", "Gaming laptop",
        new BigDecimal("1200.00"), 10, 2, "");
      Product mouse = new Product("Mouse", "SKU002", "Electronics", "Wireless mouse",
        new BigDecimal("25.00"), 50, 5, "");
      Product keyboard = new Product("Keyboard", "SKU003", "Electronics", "Mechanical keyboard",
        new BigDecimal("75.00"), 30, 5, "");
      Product monitor = new Product("Monitor", "SKU004", "Electronics", "4K Monitor",
        new BigDecimal("300.00"), 20, 3, "");
      Product chair = new Product("Chair", "SKU005", "Furniture", "Ergonomic chair",
        new BigDecimal("150.00"), 15, 2, "");
      Product desk = new Product("Desk", "SKU006", "Furniture", "Standing desk",
        new BigDecimal("400.00"), 12, 2, "");
      Product printer = new Product("Printer", "SKU007", "Electronics", "Laser printer",
        new BigDecimal("200.00"), 8, 1, "");

      productRepository.save(laptop);
      productRepository.save(mouse);
      productRepository.save(keyboard);
      productRepository.save(monitor);
      productRepository.save(chair);
      productRepository.save(desk);
      productRepository.save(printer);
    }

    // ---------- Stock Changes ----------
    if (stockChangeRepository.count() == 0) {
      User admin = userRepository.findById(1).orElseThrow();
      Product laptop = productRepository.findById(1).orElseThrow();
      Product mouse = productRepository.findById(2).orElseThrow();
      Product keyboard = productRepository.findById(3).orElseThrow();
      Product monitor = productRepository.findById(4).orElseThrow();
      Product chair = productRepository.findById(5).orElseThrow();
      Product desk = productRepository.findById(6).orElseThrow();

      StockChange change1 = new StockChange(laptop, 10, "Initial stock", admin);
      StockChange change2 = new StockChange(mouse, 50, "Initial stock", admin);
      StockChange change3 = new StockChange(keyboard, 30, "Initial stock", admin);
      StockChange change4 = new StockChange(monitor, 20, "Initial stock", admin);
      StockChange change5 = new StockChange(chair, 15, "Initial stock", admin);
      StockChange change6 = new StockChange(desk, 12, "Initial stock", admin);

      stockChangeRepository.save(change1);
      stockChangeRepository.save(change2);
      stockChangeRepository.save(change3);
      stockChangeRepository.save(change4);
      stockChangeRepository.save(change5);
      stockChangeRepository.save(change6);
    }
  }
}

