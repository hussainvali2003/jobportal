




package com.jobportal.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.entity.Recruiter;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.service.EmailService;
import com.jobportal.demo.service.RecruiterService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;
    
    @Autowired
    private EmailService emailService;
    
    private static final Map<String, String> otpStorage = new HashMap<>();
    
    // Add a new recruiter (admin only) - ENHANCED VERSION WITH BETTER ERROR HANDLING
    @PostMapping("/add")
    public ResponseEntity<?> addRecruiter(@RequestBody Recruiter recruiter, HttpSession session) {
        try {
            // Check if user is logged in and is admin
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required. Please log in to continue."));
            }
            
            if (!"ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. Only administrators can add recruiters."));
            }

            // Validate required fields with professional messages
            if (recruiter.getRecruiterId() == null || recruiter.getRecruiterId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Recruiter ID is required. Please provide a unique identifier."));
            }
            
            if (recruiter.getName() == null || recruiter.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Full name is required. Please enter the recruiter's complete name."));
            }
            
            if (recruiter.getEmail() == null || recruiter.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email address is required. Please provide a valid email."));
            }
            
            if (recruiter.getPhone() == null || recruiter.getPhone().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Phone number is required. Please enter a valid contact number."));
            }
            
            // Validate recruiter ID format (optional - you can customize this)
            String recruiterId = recruiter.getRecruiterId().trim();
            if (recruiterId.length() < 3) {
                return ResponseEntity.badRequest().body(Map.of("error", "Recruiter ID must be at least 3 characters long."));
            }
            
            // Validate email format
            if (!recruiter.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Please enter a valid email address format."));
            }

            Recruiter savedRecruiter = recruiterService.addRecruiter(recruiter);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Recruiter account created successfully! Login credentials have been sent to " + savedRecruiter.getEmail());
            response.put("recruiterId", savedRecruiter.getRecruiterId());
            response.put("name", savedRecruiter.getName());
            response.put("email", savedRecruiter.getEmail());
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            // These are our custom business logic exceptions with user-friendly messages
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Log the actual error for debugging
            System.err.println("Unexpected error in addRecruiter: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "An unexpected error occurred while creating the recruiter account. Please try again or contact support."));
        }
    }
    
    // Get all recruiters (admin only) - ENHANCED VERSION
    @GetMapping("/all")
    public ResponseEntity<?> getAllRecruiters(HttpSession session) {
        try {
            // Check if user is logged in and is admin
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required. Please log in to continue."));
            }
            
            if (!"ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. Only administrators can view recruiter information."));
            }

            List<Recruiter> recruiters = recruiterService.getAllRecruiters();
            return ResponseEntity.ok(recruiters);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Unable to retrieve recruiter information. Please try again later."));
        }
    }

    // Get recruiters (keeping original endpoint for backward compatibility)
    @GetMapping
    public ResponseEntity<?> getRecruiters(HttpSession session) {
        return getAllRecruiters(session);
    }

    // Get recruiter by ID - FIXED TYPE MISMATCH
    @GetMapping("/{id}")
    public ResponseEntity<?> getRecruiterById(@PathVariable Long id, HttpSession session) {
        try {
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required. Please log in to continue."));
            }

            Optional<Recruiter> recruiterOpt = recruiterService.getRecruiterById(id);
            if (recruiterOpt.isPresent()) {
                return ResponseEntity.ok(recruiterOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Recruiter not found with the provided ID."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Unable to retrieve recruiter information. Please try again later."));
        }
    }

    // Update recruiter - ENHANCED VERSION
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRecruiterById(@PathVariable Long id, @RequestBody Recruiter recruiter, HttpSession session) {
        try {
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required. Please log in to continue."));
            }
            
            // Admin can update any recruiter, recruiter can update only their own profile
            if (!"ADMIN".equals(currentUser.getRole()) && !currentUser.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. You can only update your own profile."));
            }

            recruiter.setId(id);
            Recruiter updatedRecruiter = recruiterService.updateRecruiter(recruiter);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Recruiter information updated successfully.",
                "recruiter", updatedRecruiter
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Unable to update recruiter information. Please try again later."));
        }
    }
    
    // Login for recruiters - KEEPING YOUR ORIGINAL LOGIC
    @PostMapping("/login")
    public ResponseEntity<?> recruiterLogin(@RequestParam String email, 
                                           @RequestParam String password,
                                           HttpSession session) {
        Optional<Recruiter> recruiter = recruiterService.getRecruiterByEmail(email);
        
        if (recruiter.isPresent() && recruiter.get().getPassword().equals(password)) {
            session.setAttribute("currentRecruiter", recruiter.get());
            
            Map<String, Object> response = new HashMap<>();
            response.put("recruiterId", recruiter.get().getRecruiterId());
            response.put("name", recruiter.get().getName());
            response.put("email", recruiter.get().getEmail());
            response.put("phone", recruiter.get().getPhone());
            response.put("phoneVerified", recruiter.get().isPhoneVerified());
            response.put("emailVerified", recruiter.get().isEmailVerified());
            response.put("imageData", recruiter.get().getImageData());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password. Please check your credentials and try again."));
    }
    
    // Get current recruiter info - KEEPING YOUR ORIGINAL LOGIC
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentRecruiter(HttpSession session) {
        Recruiter currentRecruiter = (Recruiter) session.getAttribute("currentRecruiter");
        if (currentRecruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please log in as a recruiter to access this information."));
        }
        
        Optional<Recruiter> updated = recruiterService.getRecruiterById(currentRecruiter.getId());
        
        if (updated.isPresent()) {
            Recruiter recruiter = updated.get();
            Map<String, Object> response = new HashMap<>();
            response.put("recruiterId", recruiter.getRecruiterId());
            response.put("name", recruiter.getName());
            response.put("email", recruiter.getEmail());
            response.put("phone", recruiter.getPhone());
            response.put("phoneVerified", recruiter.isPhoneVerified());
            response.put("emailVerified", recruiter.isEmailVerified());
            response.put("imageData", recruiter.getImageData());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("error", "Recruiter profile not found. Please contact support."));
    }
    
    // Send phone verification OTP - KEEPING YOUR ORIGINAL LOGIC
    @PostMapping("/send-phone-otp")
    public ResponseEntity<?> sendPhoneOTP(@RequestParam String recruiterId, 
                                              @RequestParam String phone,
                                              HttpSession session) {
        Recruiter currentRecruiter = (Recruiter) session.getAttribute("currentRecruiter");
        if (currentRecruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please log in as a recruiter to verify your phone number."));
        }
        
        Optional<Recruiter> recruiter = recruiterService.getRecruiterByRecruiterId(recruiterId);
        if (recruiter.isPresent()) {
            String otp = generateOTP();
            otpStorage.put(recruiterId + "_phone", otp);
            
            // Send OTP via email since we don't have actual SMS gateway
            emailService.sendPhoneVerificationOTP(
                recruiter.get().getEmail(), 
                recruiter.get().getName(),
                phone,
                otp
            );
            
            return ResponseEntity.ok(Map.of("message", "Verification code sent successfully to your registered email."));
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Recruiter not found. Please check your information."));
    }
    
    // Verify phone with OTP - KEEPING YOUR ORIGINAL LOGIC
    @PostMapping("/verify-phone")
    public ResponseEntity<?> verifyPhone(@RequestParam String recruiterId, 
                                             @RequestParam String otp,
                                             HttpSession session) {
        Recruiter currentRecruiter = (Recruiter) session.getAttribute("currentRecruiter");
        if (currentRecruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please log in as a recruiter to verify your phone number."));
        }
        
        String storedOtp = otpStorage.get(recruiterId + "_phone");
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(recruiterId + "_phone");
            recruiterService.verifyRecruiterPhone(recruiterId);
            return ResponseEntity.ok(Map.of("message", "Phone number verified successfully!"));
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired verification code. Please request a new code."));
    }
    
    // Update recruiter profile - KEEPING YOUR ORIGINAL LOGIC
    @PutMapping("/update")
    public ResponseEntity<?> updateRecruiter(@RequestBody Recruiter recruiter, HttpSession session) {
        Recruiter currentRecruiter = (Recruiter) session.getAttribute("currentRecruiter");
        if (currentRecruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please log in as a recruiter to update your profile."));
        }
        
        Optional<Recruiter> existingOpt = recruiterService.getRecruiterById(currentRecruiter.getId());
        if (existingOpt.isPresent()) {
            Recruiter existing = existingOpt.get();
            
            // Only update certain fields
            if (recruiter.getPhone() != null) {
                existing.setPhone(recruiter.getPhone());
            }
            if (recruiter.getImageData() != null) {
                existing.setImageData(recruiter.getImageData());
            }
            
            try {
                Recruiter updated = recruiterService.updateRecruiter(existing);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Profile updated successfully!",
                    "recruiter", updated
                ));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            }
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Unable to update profile. Please try again."));
    }
    
    // Delete recruiter (admin only) - ENHANCED VERSION
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecruiter(@PathVariable Long id, HttpSession session) {
        try {
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required. Please log in to continue."));
            }
            
            if (!"ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. Only administrators can delete recruiter accounts."));
            }

            recruiterService.deleteRecruiter(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Recruiter account has been successfully removed from the system."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Unable to delete recruiter account. Please try again later."));
        }
    }
    
    // Generate OTP - KEEPING YOUR ORIGINAL LOGIC
    private String generateOTP() {
        int otpLength = 6;
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            otp.append((int) (Math.random() * 10));
        }
        return otp.toString();
    }
    
    
 // Add this endpoint to get recruiter count
    @GetMapping("/count")
    public ResponseEntity<?> getRecruiterCount(HttpSession session) {
        try {
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
            }
            
            if (!"ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Admin access required"));
            }

            long count = recruiterService.countRecruiters();
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to get recruiter count"));
        }
    }
    
}