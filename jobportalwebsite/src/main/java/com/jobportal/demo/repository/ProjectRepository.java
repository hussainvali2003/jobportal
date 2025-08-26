package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserEmail(String email);
}
