package com.team7.backend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
  private final String SECRET_KEY = "your-secret-key";

  public String generateToken(String username) {
    return Jwts.builder()
      .setSubject(username)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
      .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
      .compact();
  }

  public String extractUsername(String token) {
    return Jwts.parser()
      .setSigningKey(SECRET_KEY)
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }
}

