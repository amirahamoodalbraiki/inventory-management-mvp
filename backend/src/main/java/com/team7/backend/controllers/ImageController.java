package com.team7.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/images")
public class ImageController {

  private final Path imagesDir;

  public ImageController(@Value("${app.images-dir}") String imagesDir) {
    this.imagesDir = Paths.get(imagesDir);
  }

  /**
   * Serves images by filename without authentication requirement.
   * Since images are now saved with SKU as filename (e.g., SKU123.jpg),
   * this endpoint will serve images using the imageUrl stored in the product database.
   *
   * Public access allows browser to load images directly via <img> tags without
   * requiring authentication headers.
   *
   * Example URLs:
   * - /images/SKU123.jpg (where SKU123.jpg is the imageUrl from product)
   * - /images/LAPTOP001.png
   */
  @GetMapping("/{filename}")
  // No @PreAuthorize annotation = public access
  public ResponseEntity<?> getImage(@PathVariable String filename) throws IOException {
    // Resolve the file path and normalize to prevent directory traversal attacks
    Path file = imagesDir.resolve(filename).normalize();

    // Security check: ensure the resolved path is still within the images directory
    if (!file.startsWith(imagesDir)) {
      return ResponseEntity.badRequest().build();
    }

    if (!Files.exists(file)) {
      return ResponseEntity.notFound().build();
    }

    // Try to guess content type (e.g., image/jpeg, image/png, etc.)
    String contentType = Files.probeContentType(file);
    if (contentType == null) {
      contentType = "application/octet-stream";
    }

    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(contentType))
      .body(Files.readAllBytes(file));
  }
}