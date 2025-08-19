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

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<Notification> getMyNotifications(Principal principal) {
    User user = userRepository.findByEmail(principal.getName())
      .orElseThrow(() -> new RuntimeException("User not found"));
    return notificationService.getUserNotifications(user);
  }
}

