
package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Recruiter;
import com.jobportal.demo.repository.RecruiterRepository;

@Service
public class RecruiterService {
    @Autowired
    private RecruiterRepository recruiterRepository;
    
    @Autowired
    private EmailService emailService;
    
    // Generate Recruiter ID (MM + 6 digits)
    public String generateRecruiterId() {
        Long count = recruiterRepository.countRecruiters();
        int nextNum = count.intValue() + 1;
        return "MM" + String.format("%06d", nextNum);
    }
    
    // Add a new recruiter with enhanced error handling
    public Recruiter addRecruiter(Recruiter recruiter) {
        // Check if recruiter ID already exists
        if (recruiter.getRecruiterId() != null && !recruiter.getRecruiterId().trim().isEmpty()) {
            if (recruiterRepository.existsByRecruiterId(recruiter.getRecruiterId())) {
                throw new RuntimeException("Recruiter ID '" + recruiter.getRecruiterId() + "' is already in use. Please choose a different ID.");
            }
        }
        
        // Check if email already exists
        if (recruiterRepository.existsByEmail(recruiter.getEmail())) {
            throw new RuntimeException("An account with email '" + recruiter.getEmail() + "' already exists. Please use a different email address.");
        }
        
        // Generate recruiter ID if not provided
        if (recruiter.getRecruiterId() == null || recruiter.getRecruiterId().isEmpty()) {
            recruiter.setRecruiterId(generateRecruiterId());
        }
        
        // Generate a temporary password if not provided
        if (recruiter.getPassword() == null || recruiter.getPassword().isEmpty()) {
            recruiter.setPassword(generateTemporaryPassword());
        }
        
        // Set email as verified by default (since admin is adding)
        recruiter.setEmailVerified(true);
        
        try {
            Recruiter savedRecruiter = recruiterRepository.save(recruiter);
            
            // Send email with credentials
            try {
                emailService.sendRecruiterCredentialsEmail(
                    savedRecruiter.getEmail(), 
                    savedRecruiter.getName(), 
                    savedRecruiter.getRecruiterId(), 
                    savedRecruiter.getPassword()
                );
            } catch (Exception e) {
                System.err.println("Failed to send email: " + e.getMessage());
                // Don't fail the recruiter creation if email fails
            }
            
            return savedRecruiter;
            
        } catch (DataIntegrityViolationException e) {
            // Handle database constraint violations with user-friendly messages
            String errorMessage = e.getMessage().toLowerCase();
            
            if (errorMessage.contains("recruiter_id") || errorMessage.contains("uknkevmgiidosqe2su3r2cp4rji")) {
                throw new RuntimeException("Recruiter ID '" + recruiter.getRecruiterId() + "' is already registered in the system. Please choose a unique ID.");
            } else if (errorMessage.contains("email") || errorMessage.contains("uk_email")) {
                throw new RuntimeException("Email address '" + recruiter.getEmail() + "' is already associated with another account. Please use a different email.");
            } else {
                throw new RuntimeException("Unable to create recruiter account due to duplicate information. Please verify all details are unique.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to create recruiter account. Please try again or contact support if the issue persists.");
        }
    }
    
    // Update existing recruiter
    public Recruiter updateRecruiter(Recruiter recruiter) {
        Optional<Recruiter> existingOpt = recruiterRepository.findById(recruiter.getId());
        if (existingOpt.isPresent()) {
            Recruiter existing = existingOpt.get();
            
            // Update allowed fields
            if (recruiter.getName() != null) {
                existing.setName(recruiter.getName());
            }
            if (recruiter.getPhone() != null) {
                existing.setPhone(recruiter.getPhone());
            }
            if (recruiter.getImageData() != null) {
                existing.setImageData(recruiter.getImageData());
            }
            if (recruiter.getPassword() != null && !recruiter.getPassword().isEmpty()) {
                existing.setPassword(recruiter.getPassword());
            }
            
            try {
                return recruiterRepository.save(existing);
            } catch (DataIntegrityViolationException e) {
                String errorMessage = e.getMessage().toLowerCase();
                
                if (errorMessage.contains("email")) {
                    throw new RuntimeException("Email address is already in use by another account.");
                } else {
                    throw new RuntimeException("Unable to update recruiter information due to duplicate data.");
                }
            }
        }
        throw new RuntimeException("Recruiter not found");
    }
    
    // Generate temporary password
    private String generateTemporaryPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }
    
    // Get all recruiters
    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }
    
    // Get recruiter by ID
    public Optional<Recruiter> getRecruiterById(Long id) {
        return recruiterRepository.findById(id);
    }
    
    // Get recruiter by email
    public Optional<Recruiter> getRecruiterByEmail(String email) {
        return recruiterRepository.findByEmail(email);
    }
    
    // Get recruiter by recruiterId
    public Optional<Recruiter> getRecruiterByRecruiterId(String recruiterId) {
        return recruiterRepository.findByRecruiterId(recruiterId);
    }
    
    // Delete recruiter
    public void deleteRecruiter(Long id) {
        recruiterRepository.deleteById(id);
    }
    
    // Verify recruiter email
    public boolean verifyRecruiterEmail(String email) {
        Optional<Recruiter> recruiter = recruiterRepository.findByEmail(email);
        if (recruiter.isPresent()) {
            Recruiter r = recruiter.get();
            r.setEmailVerified(true);
            recruiterRepository.save(r);
            return true;
        }
        return false;
    }
    
    // Verify recruiter phone
    public boolean verifyRecruiterPhone(String recruiterId) {
        Optional<Recruiter> recruiter = recruiterRepository.findByRecruiterId(recruiterId);
        if (recruiter.isPresent()) {
            Recruiter r = recruiter.get();
            r.setPhoneVerified(true);
            recruiterRepository.save(r);
            return true;
        }
        return false;
    }
    
    public long countRecruiters() {
        return recruiterRepository.countRecruiters();
    }
    
    // Update recruiter password
    public boolean updatePassword(String email, String newPassword) {
        Optional<Recruiter> recruiter = recruiterRepository.findByEmail(email);
        if (recruiter.isPresent()) {
            Recruiter r = recruiter.get();
            r.setPassword(newPassword);
            recruiterRepository.save(r);
            return true;
        }
        return false;
    }
    
    // Check if recruiter exists by email
    public boolean existsByEmail(String email) {
        return recruiterRepository.existsByEmail(email);
    }
    
    // Check if recruiter exists by recruiterId
    public boolean existsByRecruiterId(String recruiterId) {
        return recruiterRepository.existsByRecruiterId(recruiterId);
    }
    
}

