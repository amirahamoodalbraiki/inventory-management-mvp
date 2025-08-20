package com.team7.backend.controllers;

import com.team7.backend.entities.Notification;
import com.team7.backend.entities.User;
import com.team7.backend.repositories.UserRepository;
import com.team7.backend.services.NotificationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

  private final NotificationService notificationService;
  private final UserRepository userRepository;

  public NotificationController(NotificationService notificationService,
                                UserRepository userRepository) {
    this.notificationService = notificationService;
    this.userRepository = userRepository;
  }

  // 🔹 Get all notifications for the logged-in user (ADMIN + USER)
  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<Notification> getMyNotifications(Principal principal) {
    // get email from JWT token
    String email = principal.getName();

    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new RuntimeException("User not found: " + email));

    return notificationService.getUserNotifications(user);
  }

  // 🔹 Mark notification as read (ADMIN + USER)
  @PutMapping("/{id}/read")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Notification markAsRead(@PathVariable Long id, Principal principal) {
    String email = principal.getName();
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new RuntimeException("User not found: " + email));

    return notificationService.markNotificationAsRead(id, user);
  }
}
