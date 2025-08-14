package com.example.inventory.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user/products")
public class ProductController {

    private List<String> products = new ArrayList<>();

    @GetMapping
    public List<String> getProducts() {
        return products;
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody String product) {
        products.add(product);
        return ResponseEntity.ok("Product added");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        if (id < 0 || id >= products.size()) {
            return ResponseEntity.notFound().build();
        }
        products.remove(id);
        return ResponseEntity.ok("Product deleted");
    }
}
