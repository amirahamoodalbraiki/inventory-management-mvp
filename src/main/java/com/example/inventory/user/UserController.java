package com.example.inventory.user;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository users;
    public UserController(UserRepository users) { this.users = users; }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> getAll() { return users.findAll(); }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User create(@RequestBody User user) { return users.save(user); }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User updated) {
        return users.findById(id).map(u -> {
            u.setName(updated.getName());
            u.setPhone(updated.getPhone());
            u.setRole(updated.getRole());
            return users.save(u);
        }).orElseThrow();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { users.deleteById(id); }
}
