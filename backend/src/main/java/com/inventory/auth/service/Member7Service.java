package com.inventory.auth.service;

import com.inventory.auth.model.Member7;
import com.inventory.auth.repo.Member7Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Member7Service {

    private final Member7Repository member7Repository;

    public Member7Service(Member7Repository member7Repository) {
        this.member7Repository = member7Repository;
    }

    public List<Member7> getAllMembers() {
        return member7Repository.findAll();
    }

    public Optional<Member7> getMemberById(Long id) {
        return member7Repository.findById(id);
    }

    public Member7 saveMember(Member7 member7) {
        return member7Repository.save(member7);
    }

    public void deleteMember(Long id) {
        member7Repository.deleteById(id);
    }
}
