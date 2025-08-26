package com.jobportal.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.service.SmsOtpService;


@RestController
@RequestMapping("/api/sms")
public class SmsController {
	
	
	
	  @Autowired
	    private SmsOtpService smsOtpService;
	   
	    @PostMapping("/send-otp")
	    public ResponseEntity<?> sendOtp(@RequestParam String phoneno) {
	        try {
	            String resp = smsOtpService.sendOtpSms(phoneno);
	            return ResponseEntity.ok(resp);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error sending OTP: " + e.getMessage());
	        }
	    }
	   
	    @PostMapping("/verify-otp")
	    public ResponseEntity<?> verifyOtp(@RequestParam String phoneno, @RequestParam String otp) {
	        try {
	            boolean isValid = smsOtpService.verifyOtp(phoneno, otp);
	            if (isValid) {
	                return ResponseEntity.ok("OTP verified successfully.");
	            } else {
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP.");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error verifying OTP: " + e.getMessage());
	        }
	    }
}
