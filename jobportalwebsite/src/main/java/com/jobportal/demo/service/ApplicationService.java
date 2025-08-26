//
//
//
//
//package com.jobportal.demo.service;
//
//import com.jobportal.demo.entity.Application;
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.entity.Resume;
//import com.jobportal.demo.entity.Job;
//import com.jobportal.demo.repository.ApplicationRepository;
//import com.jobportal.demo.repository.UserRepository;
//import com.jobportal.demo.repository.ResumeRepository;
//import com.jobportal.demo.repository.JobRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class ApplicationService {
//    
//    @Autowired
//    private ApplicationRepository applicationRepository;
//    
//    @Autowired
//    private UserRepository userRepository;
//    
//    @Autowired
//    private JobRepository jobRepository;  
//    
//    @Autowired
//    private ResumeRepository resumeRepository;
//    
//
//    @Autowired
//    private JobSendEmailService emailService;
//
//    // Modified submitApplication method to include recruiter information
//    public Application submitApplication(String email, Long jobId, String resumeFileName) {
//        // Check if user already applied for this job
//        if (applicationRepository.existsByEmailAndJobId(email, jobId)) {
//            throw new RuntimeException("You have already applied for this job");
//        }
//        
//        // Get user details
//        Optional<User> userOpt = userRepository.findByEmail(email);
//        if (!userOpt.isPresent()) {
//            throw new RuntimeException("User not found");
//        }
//        User user = userOpt.get();
//        
//        // Get job details
//        Optional<Job> jobOpt = jobRepository.findById(jobId);
//        if (!jobOpt.isPresent()) {
//            throw new RuntimeException("Job not found");
//        }
//        Job job = jobOpt.get();
//        
//        // Create application with custom job ID and recruiter information
//        Application application = new Application(
//            user.getEmail(),
//            user.getName(),
//            user.getPhoneno(),
//            resumeFileName,
//            job.getId(),
//            job.getJobId(),
//            job.getTitle(),
//            job.getCompany(),
//            job.getRecruiterId(),  // Add recruiter ID
//            job.getRecruiterName() // Add recruiter name
//        );
//        
//        Application savedApplication = applicationRepository.save(application);
//        
//        // Send confirmation email
//        try {
//            emailService.sendJobApplicationConfirmation(
//                user.getEmail(),
//                user.getName(),
//                job.getTitle(),
//                job.getCompany(),
//                job.getJobId(),
//                job.getLocation(),
//                job.getSalary(),
//                job.getExperience()
//            );
//        } catch (Exception e) {
//            // Log email sending error but don't fail the application
//            System.err.println("Failed to send confirmation email: " + e.getMessage());
//        }
//        
//        return savedApplication;
//    }
//    
//    public List<Application> getApplicationsByEmail(String email) {
//        return applicationRepository.findByEmail(email);
//    }
//    
//    public List<Application> getApplicationsByJobId(Long jobId) {
//        return applicationRepository.findByJobId(jobId);
//    }
//    
//    public List<Application> getApplicationsByCustomJobId(String customJobId) {
//        return applicationRepository.findByCustomJobId(customJobId);
//    }
//    
//    public List<Application> getAllApplications() {
//        return applicationRepository.findAll();
//    }
//    
//    public boolean hasUserApplied(String email, Long jobId) {
//        return applicationRepository.existsByEmailAndJobId(email, jobId);
//    }
//    
//    public boolean hasUserAppliedByCustomJobId(String email, String customJobId) {
//        return applicationRepository.existsByEmailAndCustomJobId(email, customJobId);
//    }
//    
//    public Application updateApplicationStatus(Long applicationId, String status) {
//        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
//        if (!applicationOpt.isPresent()) {
//            throw new RuntimeException("Application not found");
//        }
//        
//        Application application = applicationOpt.get();
//        application.setStatus(status);
//        return applicationRepository.save(application);
//    }
//    
//    
//    public void withdrawApplication(Long applicationId) {
//        if (!applicationRepository.existsById(applicationId)) {
//            throw new RuntimeException("Application not found");
//        }
//        applicationRepository.deleteById(applicationId);
//    }
//    
//    // New methods to get applications by recruiter
//    public List<Application> getApplicationsByRecruiterId(String recruiterId) {
//        return applicationRepository.findByRecruiterId(recruiterId);
//    }
//    
//    public List<Application> getApplicationsByRecruiterName(String recruiterName) {
//        return applicationRepository.findByRecruiterName(recruiterName);
//    }
//}




package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Application;
import com.jobportal.demo.entity.Job;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.ApplicationRepository;
import com.jobportal.demo.repository.JobRepository;
import com.jobportal.demo.repository.ResumeRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ResumeScreeningService resumeScreeningService;

    @Autowired
    private JobSendEmailService emailService;

    // Main method
    public Application submitApplication(String email, Long jobId, String resumeFileName) {

        // Check if already applied
        if (applicationRepository.existsByEmailAndJobId(email, jobId)) {
            throw new RuntimeException("You have already applied for this job");
        }

        // Get user
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();

        // Get job
        Optional<Job> jobOpt = jobRepository.findById(jobId);
        if (!jobOpt.isPresent()) {
            throw new RuntimeException("Job not found");
        }
        Job job = jobOpt.get();

        // Construct resume file path
        String resumePath = "uploads/resumes/" + resumeFileName; // Adjust path as per your setup
        String jobDesc = job.getDescription(); // Make sure Job entity has this

        // 💡 Compute resume match score
        double score = resumeScreeningService.computeMatchScore(resumePath, jobDesc);
        int experience = resumeScreeningService.extractExperience(resumePath);

        Application application = new Application(
                user.getEmail(),
                user.getName(),
                user.getPhoneno(),
                resumeFileName,
                job.getId(),
                job.getJobId(),
                job.getTitle(),
                job.getCompany(),
                job.getRecruiterId(),
                job.getRecruiterName(),
                score,
                experience,
                null, // rejectionReason
                null  // notification
            );

        application.setScore(score); // ✅ Set the AI score
        application.setAtsExperience(experience); 

        Application savedApplication = applicationRepository.save(application);

        // Send confirmation email
        try {
            emailService.sendJobApplicationConfirmation(
                user.getEmail(),
                user.getName(),
                job.getTitle(),
                job.getCompany(),
                job.getJobId(),
                job.getLocation(),
                job.getSalary(),
                job.getExperience()
            );
        } catch (Exception e) {
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }

        return savedApplication;
    }

    // Other methods unchanged...
    public List<Application> getApplicationsByEmail(String email) {
        return applicationRepository.findByEmail(email);
    }

    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationsByCustomJobId(String customJobId) {
        return applicationRepository.findByCustomJobId(customJobId);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public boolean hasUserApplied(String email, Long jobId) {
        return applicationRepository.existsByEmailAndJobId(email, jobId);
    }

    public boolean hasUserAppliedByCustomJobId(String email, String customJobId) {
        return applicationRepository.existsByEmailAndCustomJobId(email, customJobId);
    }

    public Application updateApplicationStatus(Long applicationId, String status) {
        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
        if (!applicationOpt.isPresent()) {
            throw new RuntimeException("Application not found");
        }

        Application application = applicationOpt.get();
        application.setStatus(status);
        return applicationRepository.save(application);
    }

    public void withdrawApplication(Long applicationId) {
        if (!applicationRepository.existsById(applicationId)) {
            throw new RuntimeException("Application not found");
        }
        applicationRepository.deleteById(applicationId);
    }

    public List<Application> getApplicationsByRecruiterId(String recruiterId) {
        return applicationRepository.findByRecruiterId(recruiterId);
    }

    public List<Application> getApplicationsByRecruiterName(String recruiterName) {
        return applicationRepository.findByRecruiterName(recruiterName);
    }
}
