


package com.jobportal.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String phoneno;
    
    @Column(nullable = false)
    private String resume;
    
    @Column(nullable = false)
    private Long jobId;
    
    @Column(name = "custom_job_id")
    private String customJobId; // Add this field for MMJOB-XXXX
    
    @Column(nullable = false)
    private String jobTitle;
    
    @Column(nullable = false)
    private String companyName;
    
    // New fields for recruiter information
    @Column(name = "recruiter_id")
    private String recruiterId;
    
    @Column(name = "recruiter_name")
    private String recruiterName;
    
    @Column(nullable = false)
    private LocalDateTime appliedDate = LocalDateTime.now();
    
    @Column(nullable = false)
    private String status = "Pending";
    
    @Column(name = "ats_score")
    private Double score;
    
    @Column(name = "ats_experience")
    private Integer atsExperience;

    
    @Column(name = "rejection_reason")
    private String rejectionReason;
    
    @Column(name = "notification")
    private String notification ;
    
    @Column(name = "is_read", columnDefinition = "boolean default false")
    private boolean isRead = false;
    
    // Constructors
    public Application() {}
    
    
        public Application(String email, String name, String phoneno, String resume,
    		            Long jobId, String customJobId, String jobTitle, String companyName,
    		            String recruiterId, String recruiterName, Double score, Integer atsExperience, 
    		            String rejectionReason, String notification) {
    		        this.email = email;
    		        this.name = name;
    		        this.phoneno = phoneno;
    		        this.resume = resume;
    		        this.jobId = jobId;
    		        this.customJobId = customJobId;
    		        this.jobTitle = jobTitle;
    		        this.companyName = companyName;
    		        this.recruiterId = recruiterId;
    		        this.recruiterName = recruiterName;
    		        this.appliedDate = LocalDateTime.now();
    		        this.status = "Pending";
    		        this.score = score;
    		        this.atsExperience = atsExperience;
    		        this.rejectionReason = rejectionReason;
    		        this.notification = notification;
    		    }

//		    ,Integer atsExperience ,String rejectionReason ,String notification   
    public String getRejectionReason() {
				return rejectionReason;
			}



			public void setRejectionReason(String rejectionReason) {
				this.rejectionReason = rejectionReason;
			}
			
			public boolean isRead() {
			    return isRead;
			}

			public void setRead(boolean read) {
			    isRead = read;
			}


			public String getNotification() {
				return notification;
			}



			public void setNotification(String notification) {
				this.notification = notification;
			}



	// Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPhoneno() {
        return phoneno;
    }
    
    public void setPhoneno(String phoneno) {
        this.phoneno = phoneno;
    }
    
    public String getResume() {
        return resume;
    }
    
    public void setResume(String resume) {
        this.resume = resume;
    }
    
    public Long getJobId() {
        return jobId;
    }
    
    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }
    
    public String getCustomJobId() {
        return customJobId;
    }
    
    public void setCustomJobId(String customJobId) {
        this.customJobId = customJobId;
    }
    
    public String getJobTitle() {
        return jobTitle;
    }
    
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getRecruiterId() {
        return recruiterId;
    }
    
    public void setRecruiterId(String recruiterId) {
        this.recruiterId = recruiterId;
    }
    
    public String getRecruiterName() {
        return recruiterName;
    }
    
    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }
    
    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }
    
    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public Double getScore() { 
    	return score; 
    	}
    
    public void setScore(Double score) {
    	this.score = score;
    	}
    
    public Integer getAtsExperience() {
        return atsExperience;
    }

    public void setAtsExperience(Integer atsExperience) {
        this.atsExperience = atsExperience;
    }

    
}