package com.jobportal.demo.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.demo.entity.Documents;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.DocumentsRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class DocumentsService {

    @Autowired
    private DocumentsRepository documentsRepository;

    @Autowired
    private UserRepository userRepository;

    public Documents saveDocuments(String email,
                                   MultipartFile resume,
                                   MultipartFile aadhar,
                                   MultipartFile pan,
                                   MultipartFile tenth,
                                   MultipartFile intermedaite,
                                   MultipartFile degree,
                                   MultipartFile payslips) throws IOException {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        Documents doc = new Documents();
        doc.setResumes(resume.getOriginalFilename());
        doc.setAadhar(aadhar.getOriginalFilename());
        doc.setPan(pan.getOriginalFilename());
        doc.setTenth(tenth.getOriginalFilename());
        doc.setIntermedaite(intermedaite.getOriginalFilename());
        doc.setDegree(degree.getOriginalFilename());
        doc.setPayslips(payslips.getOriginalFilename());


        doc.setUser(optionalUser.get());
        return documentsRepository.save(doc);
    }
}
