package com.jobportal.demo.controller;

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

import com.jobportal.demo.entity.ITSkills;
import com.jobportal.demo.service.ITSkillsService;

@RestController
@RequestMapping("/api/itskills")
@CrossOrigin(origins = "http://localhost:3000") // adjust your frontend port if needed
public class ITSkillsController {

    @Autowired
    private ITSkillsService itSkillsService;

    // Save IT Skill
    @PostMapping("/{email}")
    public ResponseEntity<?> saveITSkill(@PathVariable String email, @RequestBody ITSkills skill) {
        try {
            ITSkills savedSkill = itSkillsService.saveITSkill(email, skill);
            return ResponseEntity.ok(savedSkill);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get IT Skills by User Email
    @GetMapping("/{email}")
    public ResponseEntity<List<ITSkills>> getITSkills(@PathVariable String email) {
        List<ITSkills> skills = itSkillsService.getITSkills(email);
        return ResponseEntity.ok(skills);
    }
    
 // Update IT Skill by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateITSkill(@PathVariable Long id, @RequestBody ITSkills skill) {
        try {
            ITSkills updated = itSkillsService.updateITSkill(id, skill);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }


    // Delete IT Skill by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteITSkill(@PathVariable Long id) {
        itSkillsService.deleteITSkill(id);
        return ResponseEntity.ok("IT Skill deleted successfully.");
    }
}
