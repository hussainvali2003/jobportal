package com.jobportal.demo.controller;

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

import com.jobportal.demo.entity.PersonalDetails;
import com.jobportal.demo.service.PersonalDetailsService;

@RestController
@RequestMapping("/api/personal-details")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalDetailsController {

    @Autowired
    private PersonalDetailsService personalDetailsService;

    // POST - Save Personal Details
    @PostMapping("/{email}")
    public ResponseEntity<?> savePersonalDetails(@PathVariable String email, @RequestBody PersonalDetails details) {
        try {
            PersonalDetails savedDetails = personalDetailsService.savePersonalDetails(email, details);
            return ResponseEntity.ok(savedDetails);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET - Fetch Personal Details by Email
    @GetMapping("/{email}")
    public ResponseEntity<?> getPersonalDetails(@PathVariable String email) {
        Optional<PersonalDetails> detailsOpt = personalDetailsService.getPersonalDetailsByEmail(email);
        if (detailsOpt.isPresent()) {
            return ResponseEntity.ok(detailsOpt.get());
        } else {
            return ResponseEntity.status(404).body("Personal details not found for email: " + email);
        }
    }
    
    
    
 // PUT - Update Personal Details by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePersonalDetails(@PathVariable Long id, @RequestBody PersonalDetails updatedDetails) {
        try {
            PersonalDetails savedDetails = personalDetailsService.updatePersonalDetails(id, updatedDetails);
            return ResponseEntity.ok(savedDetails);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // DELETE - Delete Personal Details by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePersonalDetails(@PathVariable Long id) {
        try {
            personalDetailsService.deletePersonalDetails(id);
            return ResponseEntity.ok("Personal details deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
