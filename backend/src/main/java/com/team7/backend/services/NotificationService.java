package com.team7.backend.services;

import com.team7.backend.entities.Notification;
import com.team7.backend.entities.Product;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

  private final NotificationRepository notificationRepository;

  public NotificationService(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  public void createLowStockNotification(User user, Product product) {
    String message = "⚠️ Product " + product.getName() + " is low on stock (" + product.getQuantity() + " left)";
    Notification notification = new Notification(user, product, "LOW_STOCK", message);
    notificationRepository.save(notification);
  }

  public List<Notification> getUserNotifications(User user) {
    return notificationRepository.findByUser(user);
  }
}
