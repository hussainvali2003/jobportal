package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Employment;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.EmploymentRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class EmploymentService {

    @Autowired
    private EmploymentRepository employmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Employment saveEmployment(String email, Employment employment) {
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        }
        employment.setUser(optionalUser.get());
        return employmentRepository.save(employment);
    }

    public List<Employment> getEmployments(String email) {
        return employmentRepository.findByUserEmail(email);
    }
    
    public Optional<Employment> getEmploymentById(Long id) {
        return employmentRepository.findById(id);
    }

    public Employment updateEmployment(Employment employment) {
        return employmentRepository.save(employment);
    }


    public void deleteEmployment(Long id) {
        employmentRepository.deleteById(id);
    }
}
