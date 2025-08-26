package com.jobportal.demo.controller;

import java.util.List;

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

import com.jobportal.demo.entity.KeySkills;
import com.jobportal.demo.service.KeySkillsService;

@RestController
@RequestMapping("/api/keyskills")
@CrossOrigin(origins = "http://localhost:3000")
public class KeySkillsController {

    @Autowired
    private KeySkillsService keySkillsService;

    @PostMapping("/{email}")
    public ResponseEntity<?> saveKeySkill(@PathVariable String email, @RequestBody KeySkills keySkill) {
        try {
            KeySkills savedSkill = keySkillsService.saveKeySkill(email, keySkill);
            return ResponseEntity.ok(savedSkill);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<KeySkills>> getKeySkills(@PathVariable String email) {
        List<KeySkills> skills = keySkillsService.getKeySkillsByEmail(email);
        return ResponseEntity.ok(skills);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKeySkill(@PathVariable Long id) {
        try {
            keySkillsService.deleteKeySkill(id);
            return ResponseEntity.ok("KeySkill deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
