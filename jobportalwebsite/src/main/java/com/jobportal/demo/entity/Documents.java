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

@Entity
@Table(name = "documents")
public class Documents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    private String resumes;
    private String aadhar;
    private String pan;
    private String tenth;
    private String intermedaite;
    private String degree;
    private String payslips;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    @JsonIgnore
    private User user;

    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public String getResumes() {
		return resumes;
	}

	public void setResumes(String resumes) {
		this.resumes = resumes;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}

	public String getPan() {
		return pan;
	}

	public void setPan(String pan) {
		this.pan = pan;
	}

	public String getTenth() {
		return tenth;
	}

	public void setTenth(String tenth) {
		this.tenth = tenth;
	}

	public String getIntermedaite() {
		return intermedaite;
	}

	public void setIntermedaite(String intermedaite) {
		this.intermedaite = intermedaite;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}
	
	

	public String getPayslips() {
		return payslips;
	}

	public void setPayslips(String payslips) {
		this.payslips = payslips;
	}

	public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
