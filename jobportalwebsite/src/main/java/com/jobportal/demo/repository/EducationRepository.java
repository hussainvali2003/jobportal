//
//package com.jobportal.demo.repository;
//import com.jobportal.demo.entity.Education;
//import com.jobportal.demo.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//
//
//
//public interface EducationRepository extends JpaRepository<Education, Long> {
//    List<Education> findByUser(User user);     // Optional
//    List<Education> findByUserId(Long userId);
//    List<Education> findByUserEmail(String email);
//    // :white_check_mark: This works if `user` is mapped properly
//}
//
//
//



package com.jobportal.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Education;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
 
import com.jobportal.demo.entity.User;



 
public interface EducationRepository extends JpaRepository<Education, Long> {
    // Using the proper JPA query syntax
    @Query("SELECT e FROM Education e WHERE e.user.email = :email")
    List<Education> findByUser_Email(@Param("email") String email);
}