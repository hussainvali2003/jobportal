package com.jobportal.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.entity.RecruiterInquiry;
import com.jobportal.demo.service.RecruiterInquiryService;

@RestController
@RequestMapping("/api/recruiter-inquiries")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecruiterInquiryController {

    @Autowired
    private RecruiterInquiryService service;

    @PostMapping
    public RecruiterInquiry submitInquiry(@RequestBody RecruiterInquiry inquiry) {
        return service.saveInquiry(inquiry);
    }
}
