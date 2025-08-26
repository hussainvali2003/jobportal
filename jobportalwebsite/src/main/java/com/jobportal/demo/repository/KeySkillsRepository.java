package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.KeySkills;

public interface KeySkillsRepository extends JpaRepository<KeySkills, Long> {
    List<KeySkills> findByUserEmail(String email);
}
