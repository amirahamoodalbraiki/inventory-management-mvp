package com.example.inventory.stock;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Request object for adjusting stock
record AdjustStockRequest(Long productId, int changeAmount, String reason) {}

// Response object for viewing stock
record StockView(Long productId, String name, int quantity, int lowStockThreshold) {}

@RestController
@RequestMapping("/api/stock")
@CrossOrigin // Optional: allow requests from frontend
public class StockController {

    // Only ADMIN or STAFF can adjust stock
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping("/adjust")
    public void adjustStock(@RequestBody AdjustStockRequest request) {
        // TODO: Implement logic to adjust stock:
        // 1. Find product by request.productId
        // 2. Update quantity by request.changeAmount
        // 3. Optionally log reason
        System.out.println("Adjusting stock: " + request);
    }

    // Only ADMIN or STAFF can view inventory
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/inventory")
    public List<StockView> inventory() {
        // TODO: Return actual inventory from database
        return List.of(
            new StockView(1L, "Sample Product", 10, 5),
            new StockView(2L, "Another Product", 3, 2)
        );
    }
}
