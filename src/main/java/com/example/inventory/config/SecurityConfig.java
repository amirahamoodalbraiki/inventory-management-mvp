package com.example.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Public endpoints (e.g., login/register)
                .requestMatchers("/auth/**").permitAll()

                // Only ADMIN can delete products
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                // If products are under user controllers, use:
                //.requestMatchers(HttpMethod.DELETE, "/api/user/products/**").hasRole("ADMIN")

                // Only STAFF or ADMIN can adjust stock
                .requestMatchers("/api/stock/**").hasAnyRole("STAFF", "ADMIN")
                // If stock is under user controllers, use:
                //.requestMatchers("/api/user/stock/**").hasAnyRole("STAFF", "ADMIN")

                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .httpBasic(basic -> {})   // Enable basic auth
            .formLogin(form -> {});   // Enable form login (optional)

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
