//package com.jobportal.demo.service;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.jobportal.demo.entity.User;
//import com.jobportal.demo.repository.UserRepository;
//import com.jobportal.demo.service.UserServiceInterface;
//@Service
//public class UserService implements UserServiceInterface {
//    @Autowired
//    private UserRepository userRepository;
//    @Override
//    public Optional<User> findByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//    @Override
//    public String login(String email, String password) {
//        Optional<User> userOpt = userRepository.findByEmail(email);
//        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
//            return userOpt.get().getRole(); // or return "Login successful"
//        } else {
//            throw new RuntimeException("Invalid credentials");
//        }
//    }
//    @Override
//    public User getUserByEmail(String email) {
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
//    }
//    @Override
//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }
//    
//    
//    
//    public long getUserCount() {
//        return userRepository.count();
//    }
//}


package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.UserRepository;

@Service
@Transactional
public class UserService implements UserServiceInterface {
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt.get().getRole(); // or return "Login successful"
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public long getUserCount() {
        return userRepository.count();
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Delete user by ID
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    // Update user
    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (!existingUserOpt.isPresent()) {
            throw new RuntimeException("User not found with ID: " + id);
        }

        User existingUser = existingUserOpt.get();
        
        // Update fields (excluding sensitive ones like password)
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPhoneno() != null) {
            existingUser.setPhoneno(updatedUser.getPhoneno());
        }
        if (updatedUser.getLocation() != null) {
            existingUser.setLocation(updatedUser.getLocation());
        }
        if (updatedUser.getRole() != null) {
            existingUser.setRole(updatedUser.getRole());
        }
        if (updatedUser.getExperience() >= 0) {
            existingUser.setExperience(updatedUser.getExperience());
        }
        if (updatedUser.getProfilePic() != null) {
            existingUser.setProfilePic(updatedUser.getProfilePic());
        }

        return userRepository.save(existingUser);
    }

    // Find user by phone number
    public Optional<User> findByPhoneno(String phoneNumber) {
        return userRepository.findByPhoneno(phoneNumber);
    }

    // Check if email exists
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Get users by role
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
}



