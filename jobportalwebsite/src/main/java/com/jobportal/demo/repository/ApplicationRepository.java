//package com.jobportal.demo.repository;
//
//import com.jobportal.demo.entity.Application;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface ApplicationRepository extends JpaRepository<Application, Long> {
//    List<Application> findByEmail(String email);
//    List<Application> findByJobId(Long jobId);
//    boolean existsByEmailAndJobId(String email, Long jobId);
//    List<Application> findByStatus(String status);
//}
//
//package com.jobportal.demo.repository;
//
//import com.jobportal.demo.entity.Application;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface ApplicationRepository extends JpaRepository<Application, Long> {
//    List<Application> findByEmail(String email);
//    List<Application> findByJobId(Long jobId);
//    List<Application> findByCustomJobId(String customJobId);
//    boolean existsByEmailAndJobId(String email, Long jobId);
//    boolean existsByEmailAndCustomJobId(String email, String customJobId);
//    List<Application> findByStatus(String status);
//}


package com.jobportal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.demo.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByEmail(String email);
    List<Application> findByJobId(Long jobId);
    List<Application> findByCustomJobId(String customJobId);
    boolean existsByEmailAndJobId(String email, Long jobId);
    boolean existsByEmailAndCustomJobId(String email, String customJobId);
    List<Application> findByStatus(String status);
    
    // New methods for recruiter-based queries
    List<Application> findByRecruiterId(String recruiterId);
    List<Application> findByRecruiterName(String recruiterName);
    List<Application> findByRecruiterIdAndStatus(String recruiterId, String status);
    List<Application> findByRecruiterNameAndStatus(String recruiterName, String status);
}