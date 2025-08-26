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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.entity.Accomplishment;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.AccomplishmentRepository;
import com.jobportal.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/accomplishments")
@CrossOrigin(origins = "http://localhost:3000") // adjust to your React app port
public class AccomplishmentController {

    @Autowired
    private AccomplishmentRepository accomplishmentRepository;

    @Autowired
    private UserRepository userRepository;

    // Save accomplishment
    @PostMapping("/{email}")
    public ResponseEntity<?> saveAccomplishment(@PathVariable String email, @RequestBody Accomplishment accomplishment) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("User with email " + email + " not found.");
        }
        accomplishment.setUser(optionalUser.get());
        accomplishmentRepository.save(accomplishment);
        return ResponseEntity.ok("Accomplishment saved successfully.");
    }

    // Get accomplishments by user email
    @GetMapping("/{email}")
    public ResponseEntity<List<Accomplishment>> getAccomplishments(@PathVariable String email) {
        List<Accomplishment> accomplishments = accomplishmentRepository.findByUserEmail(email);
        return ResponseEntity.ok(accomplishments);
    }

    // Delete accomplishment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccomplishment(@PathVariable Long id) {
        if (!accomplishmentRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Accomplishment with ID " + id + " not found.");
        }
        accomplishmentRepository.deleteById(id);
        return ResponseEntity.ok("Accomplishment deleted successfully.");
    }
}
