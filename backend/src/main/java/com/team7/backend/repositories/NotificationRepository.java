package com.team7.backend.repositories;

import com.team7.backend.entities.Notification;
import com.team7.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  List<Notification> findByUserAndReadFalse(User user);
  List<Notification> findByUser(User user);
}
