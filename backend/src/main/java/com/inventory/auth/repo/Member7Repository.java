package com.inventory.auth.repo;

import com.inventory.auth.model.Member7;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Member7Repository extends JpaRepository<Member7, Long> {
    // You can add custom query methods if needed
}
