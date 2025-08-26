package com.jobportal.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.PersonalDetails;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.PersonalDetailsRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class PersonalDetailsService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    private UserRepository userRepository;

    public PersonalDetails savePersonalDetails(String email, PersonalDetails details) {
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        }
        details.setUser(optionalUser.get());
        return personalDetailsRepository.save(details);
    }

    public Optional<PersonalDetails> getPersonalDetailsByEmail(String email) {
        return personalDetailsRepository.findByUserEmail(email);
    }

    public void deletePersonalDetails(Long id) {
        personalDetailsRepository.deleteById(id);
    }
    
    
    public PersonalDetails updatePersonalDetails(Long id, PersonalDetails updatedDetails) {
        Optional<PersonalDetails> existingOpt = personalDetailsRepository.findById(id);
        if (!existingOpt.isPresent()) {
            throw new IllegalArgumentException("Personal details not found with ID: " + id);
        }

        PersonalDetails existing = existingOpt.get();

        // Update the fields as needed
        existing.setGender(updatedDetails.getGender());
        existing.setMaritalStatus(updatedDetails.getMaritalStatus());
        existing.setDob(updatedDetails.getDob());
        existing.setWorkPermit(updatedDetails.getWorkPermit());
        existing.setAddress(updatedDetails.getAddress());
        existing.setNationality(updatedDetails.getNationality());
        existing.setLanguages(updatedDetails.getLanguages());
        existing.setSocialLink(updatedDetails.getSocialLink());
        existing.setEmergencyContact(updatedDetails.getEmergencyContact());
        existing.setDifferentlyAbled(updatedDetails.getDifferentlyAbled());

        return personalDetailsRepository.save(existing);
    }

}

