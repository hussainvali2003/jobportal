package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserEmail(String email);
}
