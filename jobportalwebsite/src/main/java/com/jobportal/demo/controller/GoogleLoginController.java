package com.jobportal.demo.controller;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class GoogleLoginController {

	 @Autowired
	    private UserRepository userRepository;

	    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

	    @PostMapping("/google")
	    public ResponseEntity<String> loginWithGoogle(@RequestBody TokenRequest tokenRequest) {
	        try {
	            String idTokenString = tokenRequest.getIdToken();

	            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
	                    GoogleNetHttpTransport.newTrustedTransport(),
	                    JSON_FACTORY
	            )
	            .setAudience(Collections.singletonList("1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com"))
	            .build();

	            GoogleIdToken idToken = verifier.verify(idTokenString);

	            if (idToken != null) {
	                GoogleIdToken.Payload payload = idToken.getPayload();
	                String email = payload.getEmail();
	                String name = (String) payload.get("name");

	                Optional<User> existingUser = userRepository.findByEmail(email);

	                if (existingUser.isPresent()) {
	                    // User already exists, return their role or "USER" as default
	                    User user = existingUser.get();
	                    String userRole = user.getRole() != null ? user.getRole() : "USER";
	                    return ResponseEntity.ok(userRole); // Return the user's role for existing users
	                } else {
	                    // Create new user
	                    User newUser = new User();
	                    newUser.setEmail(email);
	                    newUser.setName(name);
	                    newUser.setEmailVerified(true);
	                    newUser.setPhoneVerified(false);
	                    newUser.setPassword(""); // No password for Google login
	                    newUser.setRole("USER"); // Default role
	                    newUser.setLocation("");
	                    newUser.setTermsAndConditions("accepted");
	                    newUser.setPrivacyPolicy("accepted");
	                    newUser.setProfilePic(null);

	                    userRepository.save(newUser);
	                    return ResponseEntity.ok("USER"); // Return role for new user
	                }
	            } else {
	                return ResponseEntity.status(401).body("invalid_token"); // Token invalid/expired
	            }
	        } catch (Exception e) {
	            e.printStackTrace(); // For debugging
	            return ResponseEntity.status(500).body("error");
	        }
	    }

	    public static class TokenRequest {
	        private String idToken;

	        public String getIdToken() {
	            return idToken;
	        }

	        public void setIdToken(String idToken) {
	            this.idToken = idToken;
	        }
	    }
	}