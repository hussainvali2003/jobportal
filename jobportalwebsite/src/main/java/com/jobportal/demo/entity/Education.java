 
//package com.jobportal.demo.entity;
//
//import jakarta.persistence.*;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//
//@Entity
//@Table(name = "education")
//public class Education {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String degree;
//    private String specialization;
//    private String institution;
//    private String year;
//    private String type;
//    private Double percentage;
//
//    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_email", referencedColumnName = "email")
//    @JsonIgnore
//    private User user;
//
//    
//    public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	
//	
//
//	public String getDegree() {
//		return degree;
//	}
//
//	public void setDegree(String degree) {
//		this.degree = degree;
//	}
//
//	public String getSpecialization() {
//		return specialization;
//	}
//
//	public void setSpecialization(String specialization) {
//		this.specialization = specialization;
//	}
//
//	public String getInstitution() {
//		return institution;
//	}
//
//	public void setInstitution(String institution) {
//		this.institution = institution;
//	}
//
//	public String getYear() {
//		return year;
//	}
//
//	public void setYear(String year) {
//		this.year = year;
//	}
//
//	public String getType() {
//		return type;
//	}
//
//	public void setType(String type) {
//		this.type = type;
//	}
//
//	public Double getPercentage() {
//		return percentage;
//	}
//
//	public void setPercentage(Double percentage) {
//		this.percentage = percentage;
//	}
//
//	public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//}
//
 
package com.jobportal.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
 
 
import jakarta.persistence.*;
@Entity
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String educationType;
    private String board;
    private String degree;
    private String specialization;
    private String institution;
    private String year;
    private String type;
    private String percentage;
    private String marks;
    private String passingYear;
    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email") // Foreign key to User.email
    private User user;
    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEducationType() {
        return educationType;
    }
    public void setEducationType(String educationType) {
        this.educationType = educationType;
    }
    public String getBoard() {
        return board;
    }
    public void setBoard(String board) {
        this.board = board;
    }
    public String getDegree() {
        return degree;
    }
    public void setDegree(String degree) {
        this.degree = degree;
    }
    public String getSpecialization() {
        return specialization;
    }
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    public String getInstitution() {
        return institution;
    }
    public void setInstitution(String institution) {
        this.institution = institution;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getPercentage() {
        return percentage;
    }
    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }
    public String getMarks() {
        return marks;
    }
    public void setMarks(String marks) {
        this.marks = marks;
    }
    public String getPassingYear() {
        return passingYear;
    }
    public void setPassingYear(String passingYear) {
        this.passingYear = passingYear;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}