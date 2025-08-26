package com.jobportal.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.demo.entity.Documents;
import com.jobportal.demo.service.DocumentsService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000") // Change to your frontend origin
public class DocumentsController {

    @Autowired
    private DocumentsService documentsService;

    @PostMapping("/upload/{email}")
    public Documents uploadDocuments(
            @PathVariable String email,
            @RequestParam("resumes") MultipartFile resume,
            @RequestParam("aadhar") MultipartFile aadhar,
            @RequestParam("pan") MultipartFile pan,
            @RequestParam("tenth") MultipartFile tenth,
            @RequestParam("intermedaite") MultipartFile intermedaite,
            @RequestParam("degree") MultipartFile degree,
            @RequestParam("payslips") MultipartFile payslips
            
            
    ) throws IOException {
        return documentsService.saveDocuments(email, resume, aadhar, pan, tenth, intermedaite, degree,payslips);
    }
}
