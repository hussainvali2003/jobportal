package com.jobportal.demo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectTitle;
    private String client;
    private String projectStatus;
    private String workedFrom;
    private String workedFromMonth;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String detailsOfProject;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    @JsonIgnore
    private User user;

    // Getters and setters

    





	public User getUser() {
        return user;
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(String projectStatus) {
		this.projectStatus = projectStatus;
	}

	public String getWorkedFrom() {
		return workedFrom;
	}

	public void setWorkedFrom(String workedFrom) {
		this.workedFrom = workedFrom;
	}

	public String getWorkedFromMonth() {
		return workedFromMonth;
	}

	public void setWorkedFromMonth(String workedFromMonth) {
		this.workedFromMonth = workedFromMonth;
	}

	public String getDetailsOfProject() {
		return detailsOfProject;
	}

	public void setDetailsOfProject(String detailsOfProject) {
		this.detailsOfProject = detailsOfProject;
	}

	public void setUser(User user) {
        this.user = user;
    }
}
