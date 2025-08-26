package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.KeySkills;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.KeySkillsRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class KeySkillsService {

    @Autowired
    private KeySkillsRepository keySkillsRepository;

    @Autowired
    private UserRepository userRepository;

    public KeySkills saveKeySkill(String email, KeySkills keySkill) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new Exception("User with email " + email + " not found.");
        }
        keySkill.setUser(optionalUser.get());
        return keySkillsRepository.save(keySkill);
    }

    public List<KeySkills> getKeySkillsByEmail(String email) {
        return keySkillsRepository.findByUserEmail(email);
    }

    public void deleteKeySkill(Long id) throws Exception {
        if (!keySkillsRepository.existsById(id)) {
            throw new Exception("KeySkill with ID " + id + " not found.");
        }
        keySkillsRepository.deleteById(id);
    }
}
