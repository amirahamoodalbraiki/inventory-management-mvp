package com.team7.backend.controllers;

import com.team7.backend.entities.Product;
import com.team7.backend.repositories.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

  private final ProductRepository productRepository;

  public ProductController(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  // 🔹 Get all products (ADMIN + USER)
  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public List<Product> getAllProducts() {
    return productRepository.findByDeletedFalse();
  }

  // 🔹 Get a single product by ID (ADMIN + USER)
  @GetMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Product getProductById(@PathVariable Integer id) {
    return productRepository.findById(id)
      .filter(product -> !product.isDeleted())
      .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
  }

  // 🔹 Create a new product (ADMIN + USER)
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Product createProduct(@RequestBody Product product) {
    // Ensure deleted flag is false when creating
    product.setDeleted(false);
    return productRepository.save(product);
  }

  // 🔹 Update a product (ADMIN + USER)
  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Product updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
    return productRepository.findById(id)
      .filter(product -> !product.isDeleted())
      .map(product -> {
        product.setName(updatedProduct.getName());
        product.setSku(updatedProduct.getSku());
        product.setCategory(updatedProduct.getCategory());
        product.setDescription(updatedProduct.getDescription());
        product.setUnitPrice(updatedProduct.getUnitPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setLowStockThreshold(updatedProduct.getLowStockThreshold());
        product.setImageUrl(updatedProduct.getImageUrl());
        return productRepository.save(product);
      })
      .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
  }

  // 🔹 Soft delete a product (ADMIN only)
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteProduct(@PathVariable Integer id) {
    productRepository.findById(id)
      .ifPresentOrElse(product -> {
        product.setDeleted(true);
        productRepository.save(product);
      }, () -> {
        throw new RuntimeException("Product not found with id: " + id);
      });
  }
}
