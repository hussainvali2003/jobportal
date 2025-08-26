package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.demo.entity.Employment;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    List<Employment> findByUserEmail(String email);


}
