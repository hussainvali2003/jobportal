package com.jobportal.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jobportal.demo.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Find job by jobId
    Optional<Job> findByJobId(String jobId);
    
    // Find jobs by status
    List<Job> findByStatusIgnoreCase(String status);
    
    // Find jobs by location (case insensitive)
    List<Job> findByLocationContainingIgnoreCase(String location);
    
    // Find jobs by company (case insensitive)
    List<Job> findByCompanyContainingIgnoreCase(String company);
    
    // Find jobs by title (case insensitive)
    List<Job> findByTitleContainingIgnoreCase(String title);
    
    // Find jobs by software/field (case insensitive)
    List<Job> findByFieldContainingIgnoreCase(String field);
    
    @Query("SELECT j FROM Job j WHERE " +
            "(:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:company IS NULL OR LOWER(j.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:experience IS NULL OR LOWER(j.experience) LIKE LOWER(CONCAT('%', :experience, '%'))) AND " +
            "(:field IS NULL OR LOWER(j.field) LIKE LOWER(CONCAT('%', :field, '%'))) AND " +
            "(:status IS NULL OR LOWER(j.status) LIKE LOWER(CONCAT('%', :status, '%'))) AND " +
            "(:jobId IS NULL OR LOWER(j.jobId) LIKE LOWER(CONCAT('%', :jobId, '%')))")
     List<Job> findJobsWithFilters(
         @Param("title") String title,
         @Param("company") String company,
         @Param("location") String location,
         @Param("experience") String experience,
         @Param("field") String field,
         @Param("status") String status,
         @Param("jobId") String jobId
     );
     
    // Find all jobs ordered by posted date (newest first)
    
    @Query("SELECT j FROM Job j ORDER BY j.postedAt DESC")
    List<Job> findAllOrderByPostedAtDesc();

	
	  boolean existsByJobId(String jobId);
	    
	  List<Job> findByRecruiterId(String recruiterId);
	  
		
}