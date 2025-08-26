//package com.jobportal.demo.service;
//
//import com.jobportal.demo.entity.Resume;
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.repository.ResumeRepository;
//import com.jobportal.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class ResumeService {
//
//    @Autowired
//    private ResumeRepository resumeRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // Upload Resume
//    public Resume uploadResume(String email, MultipartFile resumeFile) {
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//        if (!optionalUser.isPresent()) {
//            throw new IllegalArgumentException("User with email " + email + " not found.");
//        }
//
//        try {
//            String uploadDir = "uploads/resumes";
//            Files.createDirectories(Paths.get(uploadDir));
//
//            String fileName = resumeFile.getOriginalFilename();
//            Path filePath = Paths.get(uploadDir, fileName);
//            resumeFile.transferTo(filePath);
//
//            Resume resume = new Resume();
//            resume.setUser(optionalUser.get());
//            resume.setResume(fileName);
//            //resume.setFilePath(filePath.toString());
//
//            return resumeRepository.save(resume);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to upload resume file.", e);
//        }
//    }
//
//    // Get Resumes by Email
//    public List<Resume> getResumesByEmail(String email) {
//        return resumeRepository.findByUserEmail(email);
//    }
//
//    // Get Resume by ID
//    public Optional<Resume> getResumeById(Long id) {
//        return resumeRepository.findById(id);
//    }
//
//    // Update Resume (only `resume` and `profilesummary` fields)
//    public Resume updateResume(Long id, Resume updatedData) {
//        Optional<Resume> optionalResume = resumeRepository.findById(id);
//        if (!optionalResume.isPresent()) {
//            throw new IllegalArgumentException("Resume with ID " + id + " not found.");
//        }
//
//        Resume existingResume = optionalResume.get();
//        existingResume.setResume(updatedData.getResume());
//        existingResume.setProfilesummary(updatedData.getProfilesummary());
//
//        return resumeRepository.save(existingResume);
//    }
//
//    // Delete Resume
//    public void deleteResume(Long id) {
//        resumeRepository.deleteById(id);
//    }
//}

package com.jobportal.demo.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.demo.entity.Resume;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.ResumeRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
@Transactional
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    // Upload Resume
    public Resume uploadResume(String email, MultipartFile resumeFile) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        }

        try {
            // Create upload directory if it doesn't exist
            String uploadDir = "uploads/resumes";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename to avoid conflicts
            String originalFileName = resumeFile.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String uniqueFileName = UUID.randomUUID().toString() + "_" + 
                                  System.currentTimeMillis() + fileExtension;

            Path filePath = uploadPath.resolve(uniqueFileName);
            
            // Copy file to destination
            Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Resume resume = new Resume();
            resume.setUser(optionalUser.get());
            resume.setResume(uniqueFileName);

            return resumeRepository.save(resume);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload resume file: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload resume: " + e.getMessage(), e);
        }
    }

    // Get Resumes by Email
    public List<Resume> getResumesByEmail(String email) {
        return resumeRepository.findByUserEmail(email);
    }

    // Get Resume by ID
    public Optional<Resume> getResumeById(Long id) {
        return resumeRepository.findById(id);
    }

    // Get all resumes
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    // Update Resume (only resume and profilesummary fields)
    public Resume updateResume(Long id, Resume updatedData) {
        Optional<Resume> optionalResume = resumeRepository.findById(id);
        if (!optionalResume.isPresent()) {
            throw new IllegalArgumentException("Resume with ID " + id + " not found.");
        }

        Resume existingResume = optionalResume.get();
        
        if (updatedData.getResume() != null) {
            existingResume.setResume(updatedData.getResume());
        }
        if (updatedData.getProfilesummary() != null) {
            existingResume.setProfilesummary(updatedData.getProfilesummary());
        }

        return resumeRepository.save(existingResume);
    }

    // Delete Resume
    public void deleteResume(Long id) {
        Optional<Resume> resumeOpt = resumeRepository.findById(id);
        if (resumeOpt.isPresent()) {
            Resume resume = resumeOpt.get();
            
            // Delete physical file if exists
            if (resume.getResume() != null && !resume.getResume().isEmpty()) {
                try {
                    Path filePath = Paths.get("uploads/resumes").resolve(resume.getResume());
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    // Log error but don't fail the deletion
                    System.err.println("Failed to delete resume file: " + e.getMessage());
                }
            }
            
            // Delete database record
            resumeRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Resume with ID " + id + " not found.");
        }
    }

    // Check if user has resume
    public boolean userHasResume(String email) {
        List<Resume> resumes = getResumesByEmail(email);
        return !resumes.isEmpty();
    }

    // Get resume count for user
    public long getResumeCountByEmail(String email) {
        return resumeRepository.findByUserEmail(email).size();
    }
}
