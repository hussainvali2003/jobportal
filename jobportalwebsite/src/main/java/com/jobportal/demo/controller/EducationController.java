//package com.jobportal.demo.controller;
//
//import com.jobportal.demo.entity.Education;
//import com.jobportal.demo.service.EducationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/education")
//@CrossOrigin(origins = "http://localhost:3000") // adjust your frontend port if needed
//public class EducationController {
//
//    @Autowired
//    private EducationService educationService;
//
//    // Save Education
//    @PostMapping("/{email}")
//    public ResponseEntity<?> saveEducation(@PathVariable String email, @RequestBody Education education) {
//        try {
//            Education savedEducation = educationService.saveEducation(email, education);
//            return ResponseEntity.ok(savedEducation);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    // Get Education by User Email
//    @GetMapping("/{email}")
//    public ResponseEntity<List<Education>> getEducation(@PathVariable String email) {
//        List<Education> educationList = educationService.getEducationByEmail(email);
//        return ResponseEntity.ok(educationList);
//    }
//    
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateEducation(@PathVariable Long id, @RequestBody Education education) {
//        try {
//            Education updated = educationService.updateEducation(id, education);
//            return ResponseEntity.ok(updated);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
//        }
//    }
//
//
//    // Delete Education by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
//        educationService.deleteEducation(id);
//        return ResponseEntity.ok("Education record deleted successfully.");
//    }
//}
//
//
//
//


 
package com.jobportal.demo.controller;
import com.jobportal.demo.entity.Education;
import com.jobportal.demo.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
 
import java.util.List;

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

import com.jobportal.demo.entity.Education;
import com.jobportal.demo.service.EducationService;


@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:3000",
             allowCredentials = "true",
             allowedHeaders = "*",
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EducationController {
    private final EducationService educationService;
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Education>> getEducationByUserEmail(@PathVariable String email) {
        try {
            List<Education> educations = educationService.getEducationByEmail(email.toLowerCase());
            return ResponseEntity.ok(educations);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @PostMapping
    public ResponseEntity<Education> saveEducation(
            @RequestParam String email,
            @RequestBody Education education) {
        try {
            Education savedEducation = educationService.saveEducation(email.toLowerCase(), education);
            return ResponseEntity.ok(savedEducation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestParam String email,
            @RequestBody Education education) {
        try {
            // Set the ID from path variable to ensure we're updating the correct record
            education.setId(id);
            Education updatedEducation = educationService.saveEducation(email.toLowerCase(), education);
            return ResponseEntity.ok(updatedEducation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id,
            @RequestParam String email) {
        try {
            educationService.deleteEducation(id, email.toLowerCase());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}