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
@Table(name = "keyskills")
public class KeySkills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillname;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    @JsonIgnore
    private User user;

    // Getters and setters

    public Long getId() {
        return id;
    }

    

    

    public String getSkillname() {
		return skillname;
	}





	public void setSkillname(String skillname) {
		this.skillname = skillname;
	}





	public void setId(Long id) {
		this.id = id;
	}





	public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
