//package com.jobportal.demo.service;
//
//import com.jobportal.demo.entity.Education;
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.repository.EducationRepository;
//import com.jobportal.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class EducationService {
//
//    @Autowired
//    private EducationRepository educationRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // Save Education by user email
//    public Education saveEducation(String email, Education education) {
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//        if (!optionalUser.isPresent()) {
//            throw new IllegalArgumentException("User with email " + email + " not found.");
//        }
//        education.setUser(optionalUser.get());
//        return educationRepository.save(education);
//    }
//
//    // Get all Education records for a user
//    public List<Education> getEducationByEmail(String email) {
//        return educationRepository.findByUserEmail(email);
//    }
//    
//    public Education updateEducation(Long id, Education updatedEducation) {
//        Optional<Education> existingEducationOpt = educationRepository.findById(id);
//        if (!existingEducationOpt.isPresent()) {
//            throw new IllegalArgumentException("Education record with ID " + id + " not found.");
//        }
//
//        Education existingEducation = existingEducationOpt.get();
//        existingEducation.setDegree(updatedEducation.getDegree());
//        existingEducation.setSpecialization(updatedEducation.getSpecialization());
//        existingEducation.setInstitution(updatedEducation.getInstitution());
//        existingEducation.setYear(updatedEducation.getYear());
//        existingEducation.setType(updatedEducation.getType());
//        existingEducation.setPercentage(updatedEducation.getPercentage());
//
//        return educationRepository.save(existingEducation);
//    }
//
//
//    // Delete Education record by ID
//    public void deleteEducation(Long id) {
//        educationRepository.deleteById(id);
//    }
//}
//


 
package com.jobportal.demo.service;
 
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.jobportal.demo.entity.Education;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.EducationRepository;
import com.jobportal.demo.repository.UserRepository;
 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
 

 
@Service
public class EducationService {
    private final EducationRepository educationRepo;
    private final UserRepository userRepo;
    public EducationService(EducationRepository educationRepo, UserRepository userRepo) {
        this.educationRepo = educationRepo;
        this.userRepo = userRepo;
    }
    public List<Education> getEducationByEmail(String email) {
        return educationRepo.findByUser_Email(email.toLowerCase());
    }
    @Transactional
    public Education saveEducation(String email, Education education) {
        User user = userRepo.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        if (education.getId() != null) {
            // Verify the education record belongs to this user
            Education existing = educationRepo.findById(education.getId())
                .orElseThrow(() -> new RuntimeException("Education not found"));
            if (!existing.getUser().getEmail().equalsIgnoreCase(email)) {
                throw new RuntimeException("Unauthorized to modify this education record");
            }
            education.setUser(existing.getUser());
        } else {
            education.setUser(user);
        }
        return educationRepo.save(education);
    }
    @Transactional
    public void deleteEducation(Long id, String email) {
        Education education = educationRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Education record not found"));
        if (!education.getUser().getEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Unauthorized to delete this education record");
        }
        educationRepo.deleteById(id);
    }
}
