//package com.jobportal.demo.controller;
//
//import com.jobportal.demo.entity.Resume;
//import com.jobportal.demo.service.ResumeService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/resumes")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ResumeController {
//
//    @Autowired
//    private ResumeService resumeService;
//
//    // Upload Resume (file upload)
//    @PostMapping("/upload")
//    public ResponseEntity<?> uploadResume(@RequestParam("resumeFile") MultipartFile resumeFile,
//                                          @RequestParam("userEmail") String email) {
//        try {
//            Resume savedResume = resumeService.uploadResume(email, resumeFile);
//            return ResponseEntity.ok(savedResume);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Failed to upload resume. Please try again.");
//        }
//    }
//
//    // Get Resumes by Email
//    @GetMapping("/{email}")
//    public ResponseEntity<?> getResumesByEmail(@PathVariable String email) {
//        try {
//            List<Resume> resumes = resumeService.getResumesByEmail(email);
//            return ResponseEntity.ok(resumes);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Failed to fetch resumes.");
//        }
//    }
//
//    // Get Resume by ID
//    @GetMapping("/id/{id}")
//    public ResponseEntity<?> getResumeById(@PathVariable Long id) {
//        return resumeService.getResumeById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // Update Resume (only `resume` and `profilesummary` fields)
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateResume(@PathVariable Long id, @RequestBody Resume resume) {
//        try {
//            Resume updatedResume = resumeService.updateResume(id, resume);
//            return ResponseEntity.ok(updatedResume);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Failed to update resume.");
//        }
//    }
//
//    // Delete Resume
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
//        try {
//            resumeService.deleteResume(id);
//            return ResponseEntity.ok("Resume deleted successfully.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Failed to delete resume.");
//        }
//    }
//    
//
//    
//    
// // ✅ Save Profile Summary
//    @PostMapping("/summary")
//    public ResponseEntity<?> saveProfileSummary(@RequestBody Map<String, String> payload) {
//        String email = payload.get("userEmail");
//        String summary = payload.get("profilesummary");
//
//        if (email == null || summary == null) {
//            return ResponseEntity.badRequest().body("Email and summary are required.");
//        }
//
//        List<Resume> resumes = resumeService.getResumesByEmail(email);
//        if (resumes.isEmpty()) {
//            return ResponseEntity.status(404).body("Resume not found for email: " + email);
//        }
//
//        Resume resume = resumes.get(0); // Assuming one resume per user
//        resume.setProfilesummary(summary);
//        resumeService.updateResume(resume.getId(), resume);
//
//        return ResponseEntity.ok("Profile summary updated successfully.");
//    }
//}



package com.jobportal.demo.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.demo.entity.Resume;
import com.jobportal.demo.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    private final String uploadDir = "uploads/resumes/";
    
    // Upload Resume (file upload)
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("resumeFile") MultipartFile resumeFile,
                                        @RequestParam("userEmail") String email) {
        try {
            Resume savedResume = resumeService.uploadResume(email, resumeFile);
            return ResponseEntity.ok(savedResume);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload resume. Please try again.");
        }
    }

    // Get Resumes by Email
    @GetMapping("/{email}")
    public ResponseEntity<?> getResumesByEmail(@PathVariable String email) {
        try {
            List<Resume> resumes = resumeService.getResumesByEmail(email);
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to fetch resumes.");
        }
    }

    // Get Resume by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getResumeById(@PathVariable Long id) {
        return resumeService.getResumeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Download Resume by ID
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadResume(@PathVariable Long id) {
        try {
            Optional<Resume> resumeOpt = resumeService.getResumeById(id);
            if (!resumeOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Resume not found with ID: " + id);
            }

            Resume resume = resumeOpt.get();
            String fileName = resume.getResume();
            
            if (fileName == null || fileName.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Resume file not found");
            }

            // Construct file path
            Path filePath = Paths.get("uploads/resumes").resolve(fileName).normalize();
            
            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Resume file not found on server");
            }

            Resource resource = new UrlResource(filePath.toUri());
            
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Resume file not readable");
            }

            // Determine content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                           "attachment; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Invalid file path: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading file: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to download resume: " + e.getMessage());
        }
    }

    // Update Resume (only resume and profilesummary fields)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@PathVariable Long id, @RequestBody Resume resume) {
        try {
            Resume updatedResume = resumeService.updateResume(id, resume);
            return ResponseEntity.ok(updatedResume);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update resume.");
        }
    }

    // Delete Resume
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
        try {
            resumeService.deleteResume(id);
            return ResponseEntity.ok("Resume deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to delete resume.");
        }
    }

    // Save Profile Summary
    @PostMapping("/summary")
    public ResponseEntity<?> saveProfileSummary(@RequestBody Map<String, String> payload) {
        String email = payload.get("userEmail");
        String summary = payload.get("profilesummary");

        if (email == null || summary == null) {
            return ResponseEntity.badRequest().body("Email and summary are required.");
        }

        List<Resume> resumes = resumeService.getResumesByEmail(email);
        if (resumes.isEmpty()) {
            return ResponseEntity.status(404).body("Resume not found for email: " + email);
        }

        Resume resume = resumes.get(0); // Assuming one resume per user
        resume.setProfilesummary(summary);
        resumeService.updateResume(resume.getId(), resume);

        return ResponseEntity.ok("Profile summary updated successfully.");
    }

    // Get all resumes (for admin)
    @GetMapping("/all")
    public ResponseEntity<?> getAllResumes() {
        try {
            List<Resume> resumes = resumeService.getAllResumes();
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch resumes: " + e.getMessage());
        }
    }
    
    
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error downloading resume: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    
    @GetMapping("/view/{filename:.+}")
    public ResponseEntity<Resource> viewResume(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/pdf";
                }
                
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error viewing resume: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    
}