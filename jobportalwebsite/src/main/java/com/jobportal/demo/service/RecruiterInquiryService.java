package com.jobportal.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.RecruiterInquiry;
import com.jobportal.demo.repository.RecruiterInquiryRepository;

@Service
public class RecruiterInquiryService {

    @Autowired
    private RecruiterInquiryRepository repository;

    public RecruiterInquiry saveInquiry(RecruiterInquiry inquiry) {
        return repository.save(inquiry);
    }
}
