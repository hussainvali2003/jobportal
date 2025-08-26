package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Accomplishment;

public interface AccomplishmentRepository extends JpaRepository<Accomplishment, Long> {
    List<Accomplishment> findByUserEmail(String email);
}

