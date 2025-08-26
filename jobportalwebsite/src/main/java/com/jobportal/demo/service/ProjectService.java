package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Project;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.ProjectRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveProject(String email, Project project) {
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        }
        project.setUser(optionalUser.get());
        return projectRepository.save(project);
    }
    public Project updateProject(Long id, Project updatedProject) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (!optionalProject.isPresent()) {
            throw new IllegalArgumentException("Project with ID " + id + " not found.");
        }

        Project existingProject = optionalProject.get();
        existingProject.setProjectTitle(updatedProject.getProjectTitle());
        existingProject.setClient(updatedProject.getClient());
        existingProject.setProjectStatus(updatedProject.getProjectStatus());
        existingProject.setWorkedFrom(updatedProject.getWorkedFrom());
        existingProject.setWorkedFromMonth(updatedProject.getWorkedFromMonth());
        existingProject.setDetailsOfProject(updatedProject.getDetailsOfProject());

        return projectRepository.save(existingProject);
    }


    public List<Project> getProjects(String email) {
        return projectRepository.findByUserEmail(email);
    }


    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
