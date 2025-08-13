package com.team7.backend.repositories;

import com.team7.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

  // Example of custom query
  Optional<User> findByEmail(String email);
}
