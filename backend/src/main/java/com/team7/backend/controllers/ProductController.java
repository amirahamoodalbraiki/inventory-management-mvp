package com.team7.backend.controllers;

import com.team7.backend.entities.Product;
import com.team7.backend.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

  private final ProductRepository productRepository;

  public ProductController(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  // Get all products
  @GetMapping
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  // Get a single product by ID
  @GetMapping("/{id}")
  public Product getProductById(@PathVariable Integer id) {
    return productRepository.findById(id).orElse(null);
  }

  // Create a new product
  @PostMapping
  public Product createProduct(@RequestBody Product product) {
    return productRepository.save(product);
  }

  // Update product
  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
    return productRepository.findById(id).map(product -> {
      product.setName(updatedProduct.getName());
      product.setSku(updatedProduct.getSku());
      product.setCategory(updatedProduct.getCategory());
      product.setDescription(updatedProduct.getDescription());
      product.setUnitPrice(updatedProduct.getUnitPrice());
      product.setQuantity(updatedProduct.getQuantity());
      product.setLowStockThreshold(updatedProduct.getLowStockThreshold());
      product.setImageUrl(updatedProduct.getImageUrl());
      return productRepository.save(product);
    }).orElse(null);
  }

  // Delete product
  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable Integer id) {
    productRepository.deleteById(id);
  }
}
