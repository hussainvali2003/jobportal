package com.jobportal.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import com.twilio.Twilio;

import jakarta.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class TwilioConfig {
	    private String accountSid;
	    private String authToken;
	    private String phoneNumber;
	    @PostConstruct
	    public void init() {
	        if (!StringUtils.hasText(accountSid) || !StringUtils.hasText(authToken)) {
	            throw new IllegalStateException(
	                "Twilio credentials not configured properly. " +
	                "Account SID: " + accountSid + ", Auth Token: " + (authToken != null ? "*****" : "null")
	            );
	        }
	       
	        try {
	            Twilio.init(accountSid, authToken);
	      
	        } catch (Exception e) {
	        
	            throw new RuntimeException("Failed to initialize Twilio", e);
	        }
	    }
	    // Getters and setters
	    public String getAccountSid() { return accountSid; }
	    public void setAccountSid(String accountSid) { this.accountSid = accountSid; }
	    public String getAuthToken() { return authToken; }
	    public void setAuthToken(String authToken) { this.authToken = authToken; }
	    public String getPhoneNumber() { return phoneNumber; }
	    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
	}
