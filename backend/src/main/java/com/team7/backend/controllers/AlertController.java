package com.team7.backend.controllers;

import com.team7.backend.entities.Alert;
import com.team7.backend.repositories.AlertRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts")
public class AlertController {

  private final AlertRepository alertRepository;

  public AlertController(AlertRepository alertRepository) {
    this.alertRepository = alertRepository;
  }

  // Get all alerts → ADMIN and USER can view
  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<Alert> getAllAlerts() {
    return alertRepository.findAll();
  }

  // Get single alert by ID → ADMIN and USER can view
  @GetMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Alert getAlertById(@PathVariable Integer id) {
    return alertRepository.findById(id).orElse(null);
  }

  // Create new alert → only ADMIN can create
  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public Alert createAlert(@RequestBody Alert alert) {
    return alertRepository.save(alert);
  }

  // Update alert → only ADMIN can update
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public Alert updateAlert(@PathVariable Integer id, @RequestBody Alert updatedAlert) {
    return alertRepository.findById(id).map(alert -> {
      alert.setMessage(updatedAlert.getMessage());
      alert.setSeverity(updatedAlert.getSeverity());
      alert.setCreatedAt(updatedAlert.getCreatedAt());
      return alertRepository.save(alert);
    }).orElse(null);
  }

  // Delete alert → only ADMIN can delete
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteAlert(@PathVariable Integer id) {
    alertRepository.deleteById(id);
  }
}
