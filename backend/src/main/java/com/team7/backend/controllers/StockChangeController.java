package com.team7.backend.controllers;

import com.team7.backend.entities.StockChange;
import com.team7.backend.services.StockChangeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock-changes")
public class StockChangeController {

  private final StockChangeService stockChangeService;

  public StockChangeController(StockChangeService stockChangeService) {
    this.stockChangeService = stockChangeService;
  }

  // 🔹 Get all stock changes → ADMIN only
  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<StockChange> getAllStockChanges() {
    return stockChangeService.getAllStockChanges();
  }

  // 🔹 Add stock change → ADMIN + USER
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public StockChange addStockChange(@RequestParam Integer productId,
                                    @RequestParam Integer changeAmount,
                                    @RequestParam String reason,
                                    @RequestParam Integer userId) {
    if (productId == null || changeAmount == null || reason == null || userId == null) {
      throw new IllegalArgumentException("All parameters are required");
    }
    return stockChangeService.addStockChange(productId, changeAmount, reason, userId);
  }

  // 🔹 Get changes for a specific product → ADMIN + USER
  @GetMapping("/product/{productId}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<StockChange> getChangesForProduct(@PathVariable Integer productId) {
    if (productId == null) {
      throw new IllegalArgumentException("Product ID is required");
    }
    return stockChangeService.getChangesForProduct(productId);
  }
}
