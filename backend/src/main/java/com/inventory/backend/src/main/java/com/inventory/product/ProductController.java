package com.inventory.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final List<Map<String, Object>> products = new ArrayList<>(List.of(
        new HashMap<>(Map.of(
            "id", "1",
            "name", "Wireless Mouse",
            "price", 15.99,
            "quantity", 100
        )),
        new HashMap<>(Map.of(
            "id", "2",
            "name", "Mechanical Keyboard",
            "price", 45.50,
            "quantity", 50
        ))
    ));

    @GetMapping
    public List<Map<String, Object>> getAllProducts() {
        return products;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createProduct(@RequestBody Map<String, Object> product) {
        String newId = String.valueOf(products.size() + 1);
        Map<String, Object> created = new HashMap<>(product);
        created.put("id", newId);
        created.putIfAbsent("quantity", 0);
        products.add(created);
        return created;
    }
}
