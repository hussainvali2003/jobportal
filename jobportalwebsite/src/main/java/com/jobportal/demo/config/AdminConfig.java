package com.jobportal.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
@Component
@ConfigurationProperties(prefix = "app.admin")
@CrossOrigin(
	    origins = "http://localhost:3000",
	    allowCredentials = "true"
	)

public class AdminConfig {
    private String name = "Prabhakar";
    private String email = "prabhakarmudhaliar@momentum-merge.com";
    private String password = "Prabhakar@888";
    private String phone = "9876543210";
    private String image = "Logoo.png";
    // Getters and setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
}