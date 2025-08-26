//

//
//package com.jobportal.demo.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "jobs")
//public class Job {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    
//    @Column(unique = true, nullable = false)
//    private String jobId;
//    
//    private String title;
//    private String company;
//    private String location;
//    private String experience;
//    private String software;
//    
//    @Lob
//    @Column(columnDefinition = "LONGTEXT")
//    private String description;
//    private String salary;
//    private String status = "LIVE"; // Default value
//    
//    // New fields for recruiter information
//    private String recruiterName;
//    private String recruiterId;
//
//    @Column(updatable = false)
//    private LocalDateTime postedAt = LocalDateTime.now();
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getJobId() {
//        return jobId;
//    }
//
//    public void setJobId(String jobId) {
//        this.jobId = jobId;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getCompany() {
//        return company;
//    }
//
//    public void setCompany(String company) {
//        this.company = company;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public String getSalary() {
//        return salary;
//    }
//
//    public void setSalary(String salary) {
//        this.salary = salary;
//    }
//    
//    public String getSoftware() {
//        return software;
//    }
//
//    public void setSoftware(String software) {
//        this.software = software;
//    }
//
//    public String getExperience() {
//        return experience;
//    }
//
//    public void setExperience(String experience) {
//        this.experience = experience;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//    
//    public String getRecruiterName() {
//        return recruiterName;
//    }
//
//    public void setRecruiterName(String recruiterName) {
//        this.recruiterName = recruiterName;
//    }
//
//    public String getRecruiterId() {
//        return recruiterId;
//    }
//
//    public void setRecruiterId(String recruiterId) {
//        this.recruiterId = recruiterId;
//    }
//
//    public LocalDateTime getPostedAt() {
//        return postedAt;
//    }
//
//    public void setPostedAt(LocalDateTime postedAt) {
//        this.postedAt = postedAt;
//    }
//}
//
//

package com.jobportal.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String jobId;
    
    private String title;
    private String company;
    private String location;
    private String experience;
    
    
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String salary;
    private String status = "LIVE"; // Default value
    private String field; // IT, Non IT
    // New fields
    private String jobType;
    private Integer openings;
    private String noticePeriod;
    
    // Existing fields for recruiter information
    private String recruiterName;
    private String recruiterId;

    @Column(updatable = false)
    private LocalDateTime postedAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }
    
    

    public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Integer getOpenings() {
        return openings;
    }

    public void setOpenings(Integer openings) {
        this.openings = openings;
    }

    public String getNoticePeriod() {
        return noticePeriod;
    }

    public void setNoticePeriod(String noticePeriod) {
        this.noticePeriod = noticePeriod;
    }
    
    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public String getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(String recruiterId) {
        this.recruiterId = recruiterId;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }
}
