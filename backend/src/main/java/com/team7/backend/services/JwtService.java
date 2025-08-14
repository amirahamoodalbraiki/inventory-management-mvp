package com.team7.backend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

  private final String SECRET_KEY = "your-very-long-secret-key-which-is-secure-and-at-least-256-bit";

  // Convert secret string to Key
  private Key getSigningKey() {
    return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
  }

  public String generateToken(String username) {
    return Jwts.builder()
      .setSubject(username)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
      .signWith(getSigningKey()) // Use Key instead of String
      .compact();
  }

  public String extractUsername(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSigningKey()) // Use parserBuilder in 0.11.x
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }
}


