//package com.jobportal.demo.service;
//import java.util.Optional;
//import com.jobportal.demo.entity.User;
//public interface UserServiceInterface {
//    Optional<User> findByEmail(String email);
//    String login(String email, String password);
//    User getUserByEmail(String email);
//    User saveUser(User user);
//}

package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import com.jobportal.demo.entity.User;

public interface UserServiceInterface {
    Optional<User> findByEmail(String email);
    String login(String email, String password);
    User getUserByEmail(String email);
    User saveUser(User user);
    
    // Additional methods for user management
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    void deleteUser(Long id);
    User updateUser(Long id, User updatedUser);
    Optional<User> findByPhoneno(String phoneNumber);
    boolean existsByEmail(String email);
    List<User> getUsersByRole(String role);
}