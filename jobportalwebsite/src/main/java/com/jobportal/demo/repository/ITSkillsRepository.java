package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.ITSkills;

public interface ITSkillsRepository extends JpaRepository<ITSkills, Long> {
    List<ITSkills> findByUserEmail(String email);
}
