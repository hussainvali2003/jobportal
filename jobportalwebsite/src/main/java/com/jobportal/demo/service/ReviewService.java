package com.jobportal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Review;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.ReviewRepository;
import com.jobportal.demo.repository.UserRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    public Review saveReview(String email, Review review) throws Exception {
        // Trim whitespace and ignore casing for email lookup
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email.trim());

        if (!optionalUser.isPresent()) {
            throw new Exception("User with email " + email + " not found.");
        }

        review.setUser(optionalUser.get());
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByEmail(String email) {
        return reviewRepository.findByUserEmail(email.trim());
    }
    
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }


    public void deleteReview(Long id) throws Exception {
        if (!reviewRepository.existsById(id)) {
            throw new Exception("Review with ID " + id + " not found.");
        }
        reviewRepository.deleteById(id);
    }
}
