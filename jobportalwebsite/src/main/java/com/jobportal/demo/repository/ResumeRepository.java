package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
	List<Resume> findByUserEmail(String email);
	
}
