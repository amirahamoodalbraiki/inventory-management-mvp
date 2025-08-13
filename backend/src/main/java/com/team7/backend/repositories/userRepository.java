package com.team7.backend.repositories;

import com.team7.backend.entities.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository  extends JpaRepository<Integer, user> {
}
