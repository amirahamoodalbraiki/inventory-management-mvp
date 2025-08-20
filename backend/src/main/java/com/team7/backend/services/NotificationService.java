package com.team7.backend.services;

import com.team7.backend.entities.Notification;
import com.team7.backend.entities.Product;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.NotificationRepository;
import com.team7.backend.repositories.ProductRepository;
import com.team7.backend.repositories.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

  private final NotificationRepository notificationRepository;
  private final ProductRepository productRepository;
  private final UserRepository userRepository;

  public NotificationService(NotificationRepository notificationRepository,
                             ProductRepository productRepository,
                             UserRepository userRepository) {
    this.notificationRepository = notificationRepository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }

  // 🔹 Create a low stock notification
  public void createLowStockNotification(User user, Product product) {
    String message = "⚠️ Product " + product.getName() + " is low on stock (" + product.getQuantity() + " left)";
    Notification notification = new Notification(user, product, "LOW_STOCK", message);
    notificationRepository.save(notification);
  }

  // 🔹 Scheduled check every 1 minute
  @Scheduled(fixedRate = 60000) // runs every 60 seconds
  public void periodicLowStockCheck() {
    List<Product> products = productRepository.findAll();

    // For simplicity, notify ADMIN when stock is low
    User admin = userRepository.findByEmail("admin@example.com")
      .orElseThrow(() -> new RuntimeException("Admin user not found"));

    for (Product product : products) {
      if (product.getQuantity() <= product.getLowStockThreshold()) {
        // avoid spamming: check if notification already exists for this product and is unread
        boolean alreadyNotified = notificationRepository.findByUserAndReadFalse(admin).stream()
          .anyMatch(n -> n.getProduct().getId().equals(product.getId()) && n.getType().equals("LOW_STOCK"));

        if (!alreadyNotified) {
          createLowStockNotification(admin, product);
        }
      }
    }
  }

  // 🔹 Fetch all notifications for a user
  public List<Notification> getUserNotifications(User user) {
    return notificationRepository.findByUser(user);
  }

  // 🔹 Fetch only unread notifications
  public List<Notification> getUnreadNotifications(User user) {
    return notificationRepository.findByUserAndReadFalse(user);
  }

  // 🔹 Mark a notification as read
  public Notification markNotificationAsRead(Long id, User user) {
    Notification notification = notificationRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Notification not found"));

    if (!notification.getUser().getId().equals(user.getId())) {
      throw new RuntimeException("Not authorized to update this notification");
    }

    notification.setRead(true);
    return notificationRepository.save(notification);
  }
}
