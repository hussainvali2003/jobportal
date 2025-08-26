//
//
//package com.jobportal.demo.service;
//
//import com.jobportal.demo.entity.Job;
//import com.jobportal.demo.repository.JobRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//@Service
//public class JobService {
//    @Autowired
//    private JobRepository jobRepository;
//    
//    public Job postJob(Job job) {
//        if (job.getStatus() == null) {
//            job.setStatus("LIVE");
//        }
//        
//        // Validate job ID uniqueness
//        if (job.getJobId() != null && jobRepository.existsByJobId(job.getJobId())) {
//            throw new RuntimeException("Job ID already exists: " + job.getJobId());
//        }
//        
//        return jobRepository.save(job);
//    }
//    
//    public List<Job> getAllJobs() {
//        return jobRepository.findAll();
//    }
//    
//    public void deleteJob(Long id) {
//        jobRepository.deleteById(id);
//    }
//    
//    public Job updateJob(Long id, Job updatedJob) {
//        Job existingJob = jobRepository.findById(id)
//            .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
//        
//        existingJob.setTitle(updatedJob.getTitle());
//        existingJob.setCompany(updatedJob.getCompany());
//        existingJob.setLocation(updatedJob.getLocation());
//        existingJob.setExperience(updatedJob.getExperience());
//        existingJob.setSoftware(updatedJob.getSoftware());
//        existingJob.setDescription(updatedJob.getDescription());
//        existingJob.setSalary(updatedJob.getSalary());
//        existingJob.setStatus(updatedJob.getStatus());
//        
//        // Don't update recruiter information and job ID (keep original values)
//        
//        return jobRepository.save(existingJob);
//    }
//    
//    // Get jobs by recruiter ID
//    public List<Job> getJobsByRecruiterId(String recruiterId) {
//        return jobRepository.findByRecruiterId(recruiterId);
//    }
//    
//    // Check if job ID exists
//    public boolean checkJobIdExists(String jobId) {
//        return jobRepository.existsByJobId(jobId);
//    }
//}
//


package com.jobportal.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Job;
import com.jobportal.demo.repository.JobRepository;
@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;
    public Job postJob(Job job) {
        if (job.getStatus() == null) {
            job.setStatus("LIVE");
        }
        // Set default values for new fields if not provided
        if (job.getJobType() == null || job.getJobType().trim().isEmpty()) {
            job.setJobType("Full Time");
        }
        if (job.getOpenings() == null || job.getOpenings() <= 0) {
            job.setOpenings(1);
        }
        if (job.getNoticePeriod() == null || job.getNoticePeriod().trim().isEmpty()) {
            job.setNoticePeriod("Immediate");
        }
        // Validate job ID uniqueness
        if (job.getJobId() != null && jobRepository.existsByJobId(job.getJobId())) {
            throw new RuntimeException("Job ID already exists: " + job.getJobId());
        }
        return jobRepository.save(job);
    }
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setExperience(updatedJob.getExperience());
        existingJob.setField(updatedJob.getField());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setStatus(updatedJob.getStatus());
        // Update new fields
        if (updatedJob.getJobType() != null) {
            existingJob.setJobType(updatedJob.getJobType());
        }
        if (updatedJob.getOpenings() != null) {
            existingJob.setOpenings(updatedJob.getOpenings());
        }
        if (updatedJob.getNoticePeriod() != null) {
            existingJob.setNoticePeriod(updatedJob.getNoticePeriod());
        }
        // Don't update recruiter information and job ID (keep original values)
        return jobRepository.save(existingJob);
    }
    // Get jobs by recruiter ID
    public List<Job> getJobsByRecruiterId(String recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId);
    }
    // Check if job ID exists
    public boolean checkJobIdExists(String jobId) {
        return jobRepository.existsByJobId(jobId);
    }
}






