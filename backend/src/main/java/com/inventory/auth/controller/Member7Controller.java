package com.inventory.auth.controller;

import com.inventory.auth.model.Member7;
import com.inventory.auth.service.Member7Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member7")
public class Member7Controller {

    private final Member7Service member7Service;

    public Member7Controller(Member7Service member7Service) {
        this.member7Service = member7Service;
    }

    @GetMapping
    public List<Member7> getAllMembers() {
        return member7Service.getAllMembers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member7> getMemberById(@PathVariable Long id) {
        return member7Service.getMemberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Member7 createMember(@RequestBody Member7 member7) {
        return member7Service.saveMember(member7);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        member7Service.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
