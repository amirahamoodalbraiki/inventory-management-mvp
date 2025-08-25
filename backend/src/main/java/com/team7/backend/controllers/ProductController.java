package com.team7.backend.controllers;

import com.team7.backend.entities.Product;
import com.team7.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

  private final ProductRepository productRepository;
  private final Path imagesDir;

  public ProductController(ProductRepository productRepository, @Value("${app.images-dir}") String imagesDir) {
    this.productRepository = productRepository;
    this.imagesDir = Paths.get(imagesDir);
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

  // 🔹 Create a new product with optional image (ADMIN + USER)
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Product createProduct(
    @RequestParam("name") String name,
    @RequestParam("sku") String sku,
    @RequestParam("category") String category,
    @RequestParam("description") String description,
    @RequestParam("unitPrice") Double unitPrice,
    @RequestParam("quantity") Integer quantity,
    @RequestParam("lowStockThreshold") Integer lowStockThreshold,
    @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

    Product product = new Product();
    product.setName(name);
    product.setSku(sku);
    product.setCategory(category);
    product.setDescription(description);
    product.setUnitPrice(BigDecimal.valueOf(unitPrice));
    product.setQuantity(quantity);
    product.setLowStockThreshold(lowStockThreshold);
    product.setDeleted(false);

    // Handle image upload if provided
    if (image != null && !image.isEmpty()) {
      String imageUrl = saveImageWithSku(image, sku);
      product.setImageUrl(imageUrl);
    }

    return productRepository.save(product);
  }

  // 🔹 Update a product with optional image (ADMIN + USER)
  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public Product updateProduct(
    @PathVariable Integer id,
    @RequestParam("name") String name,
    @RequestParam("sku") String sku,
    @RequestParam("category") String category,
    @RequestParam("description") String description,
    @RequestParam("unitPrice") Double unitPrice,
    @RequestParam("quantity") Integer quantity,
    @RequestParam("lowStockThreshold") Integer lowStockThreshold,
    @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

    return productRepository.findById(id)
      .filter(product -> !product.isDeleted())
      .map(product -> {
        product.setName(name);
        product.setSku(sku);
        product.setCategory(category);
        product.setDescription(description);
        product.setUnitPrice(BigDecimal.valueOf(unitPrice));
        product.setQuantity(quantity);
        product.setLowStockThreshold(lowStockThreshold);

        // Handle image upload if provided
        if (image != null && !image.isEmpty()) {
          try {
            String imageUrl = saveImageWithSku(image, sku);
            product.setImageUrl(imageUrl);
          } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
          }
        }

        return productRepository.save(product);
      })
      .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
  }

  // 🔹 Helper method to save image with SKU as filename
  private String saveImageWithSku(MultipartFile file, String sku) throws IOException {
    Files.createDirectories(imagesDir);

    String original = StringUtils.cleanPath(file.getOriginalFilename());
    String ext = "";
    int dot = original.lastIndexOf('.');
    if (dot >= 0) ext = original.substring(dot);

    String safeName = sku + ext; // Use SKU as filename
    Path target = imagesDir.resolve(safeName);

    Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

    // Return the public URL
    return "/images/" + safeName;
  }

  // 🔹 Soft delete a product (ADMIN only)
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
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