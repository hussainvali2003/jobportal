package com.jobportal.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.RecruiterInquiry;

public interface RecruiterInquiryRepository extends JpaRepository<RecruiterInquiry, Long> {
}
