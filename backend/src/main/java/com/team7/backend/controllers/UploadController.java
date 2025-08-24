package com.team7.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class UploadController {

  private final Path imagesDir;

  public UploadController(@Value("${app.images-dir}") String imagesDir) {
    this.imagesDir = Paths.get(imagesDir);
  }

  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws IOException {
    Files.createDirectories(imagesDir);

    String original = StringUtils.cleanPath(file.getOriginalFilename());
    String ext = "";
    int dot = original.lastIndexOf('.');
    if (dot >= 0) ext = original.substring(dot);

    String safeName = UUID.randomUUID() + ext; // avoid collisions
    Path target = imagesDir.resolve(safeName);
// optional: validate content-type/extension here
    Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

// Nginx proxies /images/** to backend, so this URL is web-accessible via http://localhost
    String publicUrl = "/images/" + safeName;
    return ResponseEntity.ok(Map.of("filename", safeName, "url", publicUrl));
  }

  @GetMapping("/{filename}")
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  public ResponseEntity<?> getImage(@PathVariable String filename) throws IOException {
    Path file = imagesDir.resolve(filename).normalize();

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
