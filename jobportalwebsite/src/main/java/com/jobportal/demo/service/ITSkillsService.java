
package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.ITSkills;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.ITSkillsRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class ITSkillsService {

    @Autowired
    private ITSkillsRepository itSkillsRepository;

    @Autowired
    private UserRepository userRepository;

    public ITSkills saveITSkill(String email, ITSkills skill) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        }
        skill.setUser(optionalUser.get());
        return itSkillsRepository.save(skill);
    }

    public List<ITSkills> getITSkills(String email) {
        return itSkillsRepository.findByUserEmail(email);
    }
    
    public ITSkills updateITSkill(Long id, ITSkills updatedSkill) {
        Optional<ITSkills> existingSkillOpt = itSkillsRepository.findById(id);
        if (!existingSkillOpt.isPresent()) {
            throw new IllegalArgumentException("Skill with ID " + id + " not found.");
        }

        ITSkills existingSkill = existingSkillOpt.get();
        existingSkill.setSkillname(updatedSkill.getSkillname());
        existingSkill.setLastused(updatedSkill.getLastused());
        existingSkill.setYear(updatedSkill.getYear());
        existingSkill.setMonth(updatedSkill.getMonth());

        return itSkillsRepository.save(existingSkill);
    }


    public void deleteITSkill(Long id) {
        itSkillsRepository.deleteById(id);
    }
}
