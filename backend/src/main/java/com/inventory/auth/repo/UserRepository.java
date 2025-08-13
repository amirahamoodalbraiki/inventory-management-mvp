package com.inventory.auth.repo;

import com.inventory.auth.model.User;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    void save(User user);
}
