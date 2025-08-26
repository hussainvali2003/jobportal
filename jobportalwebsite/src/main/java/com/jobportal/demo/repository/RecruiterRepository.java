


package com.jobportal.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jobportal.demo.entity.Recruiter;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
    
    // Find recruiter by email
    Optional<Recruiter> findByEmail(String email);
    
    // Find recruiter by recruiterId
    Optional<Recruiter> findByRecruiterId(String recruiterId);
    
    // Count total recruiters for ID generation
    @Query("SELECT COUNT(r) FROM Recruiter r")
    Long countRecruiters();
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Check if recruiterId exists
    boolean existsByRecruiterId(String recruiterId);
    
    // Find all verified recruiters
    @Query("SELECT r FROM Recruiter r WHERE r.emailVerified = true")
    java.util.List<Recruiter> findAllVerifiedRecruiters();
    
    // Find recruiters by phone verification status
    java.util.List<Recruiter> findByPhoneVerified(boolean phoneVerified);
    
    
    
}
