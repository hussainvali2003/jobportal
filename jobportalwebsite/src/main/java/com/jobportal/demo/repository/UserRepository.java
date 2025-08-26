//
//
//package com.jobportal.demo.repository;
//
//import com.jobportal.demo.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByEmail(String email);
//    
//    Optional<User> findByEmailIgnoreCase(String email);
//
//	Optional<User> findByPhoneno(String phoneNumber);
//}
//


package com.jobportal.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jobportal.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailIgnoreCase(String email);
    
    Optional<User> findByPhoneno(String phoneNumber);
    
    // Find users by role
    List<User> findByRole(String role);
    
    // Find users by location
    List<User> findByLocation(String location);
    
    // Find users by experience range
    List<User> findByExperienceGreaterThanEqual(int experience);
    
    // Custom query to find users with resumes
    @Query("SELECT u FROM User u WHERE SIZE(u.resumes) > 0")
    List<User> findUsersWithResumes();
    
    // Find users by email verification status
    List<User> findByEmailVerified(Boolean emailVerified);
    
    // Find users by phone verification status
    List<User> findByPhoneVerified(Boolean phoneVerified);
    
    // Search users by name containing
    List<User> findByNameContainingIgnoreCase(String name);
    
    // Search users by email containing
    List<User> findByEmailContainingIgnoreCase(String email);
}