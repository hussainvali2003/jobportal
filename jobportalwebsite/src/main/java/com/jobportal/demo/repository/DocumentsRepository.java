package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Documents;

public interface DocumentsRepository extends JpaRepository <Documents, Long> {
	List<Documents> findByUserEmail(String email);
	
	

}
