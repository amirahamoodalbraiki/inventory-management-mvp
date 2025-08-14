package com.example.inventory.stock;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

record AdjustStockRequest(Long productId, int changeAmount, String reason) {}
record StockView(Long productId, String name, int quantity, int lowStockThreshold) {}

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping("/adjust")
    public void adjustStock(@RequestBody AdjustStockRequest request) {
        // TODO: Implement logic
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/inventory")
    public List<StockView> inventory() {
        return List.of(); // TODO: Return inventory
    }
}
