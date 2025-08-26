package com.jobportal.demo.controller;

import java.util.List;
import java.util.Optional;

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

import com.jobportal.demo.entity.Employment;
import com.jobportal.demo.service.EmploymentService;

@RestController
@RequestMapping("/api/employments")
@CrossOrigin(origins = "http://localhost:3000")
public class EmploymentController {

    @Autowired
    private EmploymentService employmentService;

    // POST - Save Employment
    @PostMapping("/{email}")
    public ResponseEntity<?> saveEmployment(@PathVariable String email, @RequestBody Employment employment) {
        try {
            // Trim and sanitize the email to prevent encoding issues
            String sanitizedEmail = email.trim();
            Employment savedEmployment = employmentService.saveEmployment(sanitizedEmail, employment);
            return ResponseEntity.ok(savedEmployment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    // GET - List Employments by Email
    @GetMapping("/{email}")
    public ResponseEntity<List<Employment>> getEmployments(@PathVariable String email) {
        String sanitizedEmail = email.trim();
        List<Employment> employments = employmentService.getEmployments(sanitizedEmail);
        return ResponseEntity.ok(employments);
        
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployment(@PathVariable Long id, @RequestBody Employment updatedEmployment) {
        try {
            Optional<Employment> existingOpt = employmentService.getEmploymentById(id);
            if (existingOpt.isPresent()) {
                Employment existing = existingOpt.get();
                
                existing.setCurrentEmployment(updatedEmployment.getCurrentEmployment());
                existing.setEmpType(updatedEmployment.getEmpType());
                existing.setJoinYear(updatedEmployment.getJoinYear());
                existing.setJoinMonth(updatedEmployment.getJoinMonth());
                existing.setComname(updatedEmployment.getComname());
                existing.setCurrentJobTitle(updatedEmployment.getCurrentJobTitle());
                existing.setCurrentSalary(updatedEmployment.getCurrentSalary());
                existing.setSkill(updatedEmployment.getSkill());
                existing.setJobProfile(updatedEmployment.getJobProfile());
                existing.setNoticePeriod(updatedEmployment.getNoticePeriod());

                Employment saved = employmentService.updateEmployment(existing);
                return ResponseEntity.ok(saved);
            } else {
                return ResponseEntity.status(404).body("Employment not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating employment: " + e.getMessage());
        }
    }

    

    // DELETE - Delete Employment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployment(@PathVariable Long id) {
        try {
            employmentService.deleteEmployment(id);
            return ResponseEntity.ok("Employment deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
}
