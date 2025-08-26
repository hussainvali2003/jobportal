//package com.jobportal.demo.controller;
//
//import com.jobportal.demo.entity.Application;
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.entity.Resume;
//import com.jobportal.demo.service.ApplicationService;
//import com.jobportal.demo.service.UserService;
//import com.jobportal.demo.service.ResumeService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap;
//
//@RestController
//@RequestMapping("/api/applications")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ApplicationController {
//    
//    @Autowired
//    private ApplicationService applicationService;
//    
//    @Autowired
//    private UserService userService;
//    
//    @Autowired
//    private ResumeService resumeService;
//    
//    @PostMapping("/submit")
//    public ResponseEntity<?> submitApplication(@RequestBody Map<String, Object> request) {
//        try {
//            String email = (String) request.get("email");
//            Long jobId = Long.valueOf(request.get("jobId").toString());
//            String resumeFileName = (String) request.get("resume");
//            
//            Application application = applicationService.submitApplication(email, jobId, resumeFileName);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application submitted successfully");
//            response.put("application", application);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/user/{email}")
//    public ResponseEntity<?> getUserApplications(@PathVariable String email) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByEmail(email);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/job/{jobId}")
//    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/check/{email}/{jobId}")
//    public ResponseEntity<?> checkApplicationStatus(@PathVariable String email, @PathVariable Long jobId) {
//        try {
//            boolean hasApplied = applicationService.hasUserApplied(email, jobId);
//            Map<String, Object> response = new HashMap<>();
//            response.put("hasApplied", hasApplied);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/user-data/{email}")
//    public ResponseEntity<?> getUserDataForApplication(@PathVariable String email) {
//        try {
//            User user = userService.getUserByEmail(email);
//            if (user == null) {
//                Map<String, Object> response = new HashMap<>();
//                response.put("success", false);
//                response.put("message", "User not found");
//                return ResponseEntity.badRequest().body(response);
//            }
//            
//            List<Resume> resumes = resumeService.getResumesByEmail(email);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("user", user);
//            response.put("resumes", resumes);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/all")
//    public ResponseEntity<?> getAllApplications() {
//        try {
//            List<Application> applications = applicationService.getAllApplications();
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    
//    @DeleteMapping("/withdraw/{applicationId}")
//    public ResponseEntity<?> withdrawApplication(@PathVariable Long applicationId) {
//        try {
//            applicationService.withdrawApplication(applicationId);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application withdrawn successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    
//    @PutMapping("/status/{applicationId}")
//    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long applicationId, @RequestBody Map<String, String> request) {
//        try {
//            String status = request.get("status");
//            Application application = applicationService.updateApplicationStatus(applicationId, status);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application status updated successfully");
//            response.put("application", application);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//}


//
//package com.jobportal.demo.controller;
//
//import com.jobportal.demo.entity.Application;
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.entity.Resume;
//import com.jobportal.demo.service.ApplicationService;
//import com.jobportal.demo.service.UserService;
//import com.jobportal.demo.service.ResumeService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap;
//
//@RestController
//@RequestMapping("/api/applications")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ApplicationController {
//    
//    @Autowired
//    private ApplicationService applicationService;
//    
//    @Autowired
//    private UserService userService;
//    
//    @Autowired
//    private ResumeService resumeService;
//    
//    @PostMapping("/submit")
//    public ResponseEntity<?> submitApplication(@RequestBody Map<String, Object> request) {
//        try {
//            String email = (String) request.get("email");
//            Long jobId = Long.valueOf(request.get("jobId").toString());
//            String resumeFileName = (String) request.get("resume");
//            
//            Application application = applicationService.submitApplication(email, jobId, resumeFileName);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application submitted successfully");
//            response.put("application", application);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/user/{email}")
//    public ResponseEntity<?> getUserApplications(@PathVariable String email) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByEmail(email);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/job/{jobId}")
//    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/check/{email}/{jobId}")
//    public ResponseEntity<?> checkApplicationStatus(@PathVariable String email, @PathVariable Long jobId) {
//        try {
//            boolean hasApplied = applicationService.hasUserApplied(email, jobId);
//            Map<String, Object> response = new HashMap<>();
//            response.put("hasApplied", hasApplied);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/user-data/{email}")
//    public ResponseEntity<?> getUserDataForApplication(@PathVariable String email) {
//        try {
//            User user = userService.getUserByEmail(email);
//            if (user == null) {
//                Map<String, Object> response = new HashMap<>();
//                response.put("success", false);
//                response.put("message", "User not found");
//                return ResponseEntity.badRequest().body(response);
//            }
//            
//            List<Resume> resumes = resumeService.getResumesByEmail(email);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("user", user);
//            response.put("resumes", resumes);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/all")
//    public ResponseEntity<?> getAllApplications() {
//        try {
//            List<Application> applications = applicationService.getAllApplications();
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @DeleteMapping("/withdraw/{applicationId}")
//    public ResponseEntity<?> withdrawApplication(@PathVariable Long applicationId) {
//        try {
//            applicationService.withdrawApplication(applicationId);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application withdrawn successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @PutMapping("/status/{applicationId}")
//    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long applicationId, @RequestBody Map<String, String> request) {
//        try {
//            String status = request.get("status");
//            Application application = applicationService.updateApplicationStatus(applicationId, status);
//            
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Application status updated successfully");
//            response.put("application", application);
//            
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    // New endpoints for recruiter-based queries
//    @GetMapping("/recruiter/{recruiterId}")
//    public ResponseEntity<?> getApplicationsByRecruiterId(@PathVariable String recruiterId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByRecruiterId(recruiterId);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//    
//    @GetMapping("/recruiter-name/{recruiterName}")
//    public ResponseEntity<?> getApplicationsByRecruiterName(@PathVariable String recruiterName) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByRecruiterName(recruiterName);
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//}




package com.jobportal.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.entity.Application;
import com.jobportal.demo.entity.Resume;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.service.ApplicationService;
import com.jobportal.demo.service.ResumeService;
 
import com.jobportal.demo.service.JobSendEmailService;
import com.jobportal.demo.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
 
import com.jobportal.demo.service.UserService;
 

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {
    
    @Autowired
    private ApplicationService applicationService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ResumeService resumeService;
    
    @Autowired
    private JobSendEmailService emailService;
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @PostMapping("/submit")
    public ResponseEntity<?> submitApplication(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            Long jobId = Long.valueOf(request.get("jobId").toString());
            String resumeFileName = (String) request.get("resume");
            
            Application application = applicationService.submitApplication(email, jobId, resumeFileName);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Application submitted successfully");
            response.put("application", application);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserApplications(@PathVariable String email) {
        try {
            List<Application> applications = applicationService.getApplicationsByEmail(email);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId) {
        try {
            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/check/{email}/{jobId}")
    public ResponseEntity<?> checkApplicationStatus(@PathVariable String email, @PathVariable Long jobId) {
        try {
            boolean hasApplied = applicationService.hasUserApplied(email, jobId);
            Map<String, Object> response = new HashMap<>();
            response.put("hasApplied", hasApplied);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/user-data/{email}")
    public ResponseEntity<?> getUserDataForApplication(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.badRequest().body(response);
            }
            
            List<Resume> resumes = resumeService.getResumesByEmail(email);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", user);
            response.put("resumes", resumes);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllApplications() {
        try {
            List<Application> applications = applicationService.getAllApplications();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/withdraw/{applicationId}")
    public ResponseEntity<?> withdrawApplication(@PathVariable Long applicationId) {
        try {
            applicationService.withdrawApplication(applicationId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Application withdrawn successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ENHANCED STATUS UPDATE WITH EMAIL AUTOMATION
    @PutMapping("/status/{applicationId}")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long applicationId, 
                                                    @RequestBody Map<String, Object> request) {
        try {
            String status = (String) request.get("status");
            String email = (String) request.get("email");
            String name = (String) request.get("name");
            String jobTitle = (String) request.get("jobTitle");
            String companyName = (String) request.get("companyName");
            
            Application application = applicationService.updateApplicationStatus(applicationId, status);
            
            // Send email based on status change
            try {
                if ("Resume Shortlisted".equals(status)) {
                    emailService.sendShortlistEmail(email, name, jobTitle, companyName);
                    application.setNotification("Your resume has been shortlisted for " + jobTitle + " at " + companyName + ".");
                } else if ("Rejected".equals(status)) {
                    String rejectionReason = application.getRejectionReason();
                    emailService.sendRejectionEmail(email, name, jobTitle, companyName, rejectionReason);
                    application.setNotification("Your resume was not shortlisted for " + jobTitle + ". We wish you the best of luck.");
                } else if ("Interview".equals(status)) {
                    emailService.sendInterviewEmail(email, name, jobTitle, companyName);
                    application.setNotification("Congratulations! You have been selected for an interview for " + jobTitle + " at " + companyName + ".");
                } else if ("Hired".equals(status)) {
                    emailService.sendHiredEmail(email, name, jobTitle, companyName);
                    application.setNotification("Congratulations! You have been hired for " + jobTitle + " at " + companyName + ".");
                }
                
                applicationRepository.save(application);
            } catch (Exception emailError) {
                System.err.println("Failed to send email: " + emailError.getMessage());
                // Continue with status update even if email fails
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Application status updated successfully");
            response.put("application", application);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // NEW: BULK SHORTLIST ENDPOINT
    @PostMapping("/bulk-shortlist")
    public ResponseEntity<?> bulkShortlistByScore(@RequestBody Map<String, Object> request) {
        try {
            Double scoreThreshold = Double.valueOf(request.get("scoreThreshold").toString());
            
            List<Application> allApplications = applicationService.getAllApplications();
            int shortlistedCount = 0;
            int rejectedCount = 0;
            
            for (Application app : allApplications) {
                if (app.getScore() != null && "Pending".equals(app.getStatus())) {
                    if (app.getScore() > scoreThreshold) {
                        app.setStatus("Resume Shortlisted");
                        app.setNotification("Your resume has been shortlisted for " + app.getJobTitle() + " at " + app.getCompanyName() + ".");
                        
                        try {
                            emailService.sendShortlistEmail(app.getEmail(), app.getName(), 
                                app.getJobTitle(), app.getCompanyName());
                        } catch (Exception emailError) {
                            System.err.println("Failed to send shortlist email to " + app.getEmail() + ": " + emailError.getMessage());
                        }
                        
                        shortlistedCount++;
                    } else {
                        app.setStatus("Rejected");
                        app.setRejectionReason("Score below threshold (" + scoreThreshold + ")");
                        app.setNotification("Your resume was not shortlisted for " + app.getJobTitle() + ". We wish you the best of luck.");
                        
                        try {
                            emailService.sendRejectionEmail(app.getEmail(), app.getName(), 
                                app.getJobTitle(), app.getCompanyName(), app.getRejectionReason());
                        } catch (Exception emailError) {
                            System.err.println("Failed to send rejection email to " + app.getEmail() + ": " + emailError.getMessage());
                        }
                        
                        rejectedCount++;
                    }
                    applicationRepository.save(app);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bulk shortlisting completed");
            response.put("shortlistedCount", shortlistedCount);
            response.put("rejectedCount", rejectedCount);
            response.put("scoreThreshold", scoreThreshold);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // NEW: UPDATE REJECTION REASON
    @PutMapping("/rejection-reason/{applicationId}")
    public ResponseEntity<?> updateRejectionReason(@PathVariable Long applicationId, 
                                                  @RequestBody Map<String, String> request) {
        try {
            String rejectionReason = request.get("rejectionReason");
            Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
            
            if (!applicationOpt.isPresent()) {
                throw new RuntimeException("Application not found");
            }
            
            Application application = applicationOpt.get();
            application.setRejectionReason(rejectionReason);
            applicationRepository.save(application);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Rejection reason updated");
            response.put("application", application);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Existing recruiter endpoints
    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<?> getApplicationsByRecruiterId(@PathVariable String recruiterId) {
        try {
            List<Application> applications = applicationService.getApplicationsByRecruiterId(recruiterId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/recruiter-name/{recruiterName}")
    public ResponseEntity<?> getApplicationsByRecruiterName(@PathVariable String recruiterName) {
        try {
            List<Application> applications = applicationService.getApplicationsByRecruiterName(recruiterName);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    
    
 // Add this to your ApplicationController.java

    @PatchMapping("/mark-read/{applicationId}")
    public ResponseEntity<?> markAsRead(@PathVariable Long applicationId) {
        try {
            Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
            
            if (!applicationOpt.isPresent()) {
                throw new RuntimeException("Application not found");
            }
            
            Application application = applicationOpt.get();
            application.setRead(true);
            applicationRepository.save(application);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Notification marked as read");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PatchMapping("/mark-all-read/{email}")
    public ResponseEntity<?> markAllAsRead(@PathVariable String email) {
        try {
            List<Application> applications = applicationRepository.findByEmail(email);
            
            for (Application app : applications) {
                if (app.getNotification() != null && !app.isRead()) {
                    app.setRead(true);
                    applicationRepository.save(app);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "All notifications marked as read");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    
    
}