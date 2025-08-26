
package com.jobportal.demo.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.demo.config.AdminConfig;
import com.jobportal.demo.entity.LoginRequest;
import com.jobportal.demo.entity.Recruiter;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.RecruiterRepository;
import com.jobportal.demo.repository.UserRepository;
import com.jobportal.demo.service.RegistrationEmailService;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
	    origins = "http://localhost:3000",
	    allowCredentials = "true",
	    allowedHeaders = "*",
	    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
	)

public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RecruiterRepository recruiterRepository;
    @Autowired
    private AdminConfig adminConfig;
    

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private RegistrationEmailService registrationEmailService;

    private static final Map<String, String> otpStorage = new HashMap<>();


    
   
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        // Sanitize and validate phone number
        String phone = Optional.ofNullable(user.getPhoneno())
                .orElse("")
                .trim()
                .replaceAll("[^\\d]", ""); // Keep only digits
        if (!phone.matches("^[6-9]\\d{9}$")) {
            return ResponseEntity.badRequest().body("Invalid mobile number. Must start with 6-9 and be 10 digits.");
        }
        user.setPhoneno(phone);

        // Validate password strength
        if (!isValidPassword(user.getPassword())) {
            return ResponseEntity.badRequest().body(
                    "Password must be at least 8 characters long and include at least 1 capital letter, 1 special character, and 1 number.");
        }

        // Ensure terms and privacy values are not null
        user.setTermsAndConditions(Optional.ofNullable(user.getTermsAndConditions()).orElse(""));
        user.setPrivacyPolicy(Optional.ofNullable(user.getPrivacyPolicy()).orElse(""));

        // Save user
        userRepository.save(user);

        // Send registration email
        registrationEmailService.sendRegistrationSuccessEmail(user.getEmail(), user.getName());

        return ResponseEntity.ok("User registered successfully.");
    }

    private boolean isValidPassword(String password) {
        // At least 8 characters, 1 uppercase, 1 special character, and 1 digit
        return password != null && password.matches("^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;\"'<>,.?/])(?=.*\\d).{8,}$");
    }

    
    
    
    // ✅ Login
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
//        Optional<User> user = userRepository.findByEmail(email);
//        if (user.isPresent() && user.get().getPassword().equals(password)) {
//            return ResponseEntity.ok(user.get().getRole());
//        }
//        return ResponseEntity.badRequest().body("Invalid credentials.");
//    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get().getRole());
        }

        return ResponseEntity.badRequest().body("Invalid credentials.");
    }	
    
    
    
//    
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
//        Optional<User> user = userRepository.findByEmail(email);
//        if (user.isPresent() && user.get().getPassword().equals(password)) {
//            // Store user email in session
//            session.setAttribute("userEmail", email);
//            return ResponseEntity.ok(user.get().getRole());
//        }
//        return ResponseEntity.badRequest().body("Invalid credentials.");
//    }
//    
//    @GetMapping("/me")
//    public ResponseEntity<?> getLoggedInUser(HttpSession session) {
//        String email = (String) session.getAttribute("userEmail");
//        if (email == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login");
//        }
//
//        Optional<User> userOptional = userRepository.findByEmail(email);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            Map<String, Object> response = new HashMap<>();
//            response.put("name", user.getName());
//            response.put("email", user.getEmail());
//            response.put("phoneno", user.getPhoneno());
//            response.put("experience", user.getExperience());
//            response.put("location", user.getLocation());
//            response.put("userrole", user.getuserrole());
//            return ResponseEntity.ok(response);
//        }
//
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//    }


    
    
    @GetMapping("/user")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.map(user -> {
            Map<String, Object> response = new HashMap<>();
            response.put("name", user.getName());
            response.put("phoneno", user.getPhoneno());
            response.put("email", user.getEmail());
            response.put("experience", user.getExperience());
            response.put("location", user.getLocation());
            response.put("userrole", user.getuserrole());
            response.put("emailverified",user.isEmailVerified());
           

            if (user.getProfilePic() != null) {
                String base64Image = Base64.getEncoder().encodeToString(user.getProfilePic());
                response.put("profilePic", base64Image);
            }

            return ResponseEntity.ok(response);
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                                         .body(Collections.singletonMap("error", "User not found")));
    }


    // ✅ Update user
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("phoneno") String phoneno,
            @RequestParam("location") String location,
            @RequestParam("userrole") String userrole,
            @RequestParam("experience") int experience,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();
        user.setName(name);
        user.setPhoneno(phoneno);
        user.setLocation(location);
        user.setuserrole(userrole);
        user.setExperience(experience);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                user.setProfilePic(imageFile.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read image data");
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok("User updated successfully");
    }

    // ✅ View profile
    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getUserProfile(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Forgot password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            String otp = generateOTP();
            otpStorage.put(email, otp);
            sendOtpEmail(email, "Your OTP for Password Reset", "Your OTP is: " + otp);
            return ResponseEntity.ok("OTP sent to your email.");
        }
        return ResponseEntity.badRequest().body("Email not found.");
    }

    // ✅ Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String otp, @RequestParam String newPassword) {
        if (!otpStorage.containsKey(email) || !otpStorage.get(email).equals(otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP or user not found.");
        }

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            if (!isValidPassword(newPassword)) {
                return ResponseEntity.badRequest().body("New password is too weak.");
            }

            user.get().setPassword(newPassword);
            userRepository.save(user.get());
            otpStorage.remove(email);
            return ResponseEntity.ok("Password reset successful.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }



 // ✅ SEND EMAIL OTP
    @PostMapping("/send-email-otp")
    public ResponseEntity<String> sendEmailOtp(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User not found. Please register first.");
        }

        String otp = generateOTP();
        otpStorage.put(email, otp);

        try {
            sendOtpEmail(email, "OTP Verification", "Your OTP is: " + otp);
            return ResponseEntity.ok("OTP sent to email.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send OTP email.");
        }
    }

    // ✅ VERIFY EMAIL OTP
    @PostMapping("/verify-email-otp")
    public ResponseEntity<Map<String, Boolean>> verifyEmailOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        Map<String, Boolean> response = new HashMap<>();

        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            otpStorage.remove(email);

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setEmailVerified(true);
                userRepository.save(user);
            }

            response.put("verified", true);
            return ResponseEntity.ok(response);
        } else {
            response.put("verified", false);
            return ResponseEntity.badRequest().body(response);
        }
    }

    

    
    private void sendOtpEmail(String email, String otp, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Your One-Time Password (OTP) for Account Security");
            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "    <meta charset='UTF-8'>" +
                    "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "    <style>" +
                    "        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #F5F7FA; color: #333; }" +
                    "        .container { max-width: 600px; margin: 20px auto; background: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; }" +
                    "        .header { background-color: #2C3E50; padding: 20px; text-align: center; }" +
                    "        .header h1 { color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 600; }" +
                    "        .content { padding: 30px; }" +
                    "        .greeting { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }" +
                    "        .otp-container { background: #F8F9FA; border-radius: 6px; padding: 15px; text-align: center; margin: 25px 0; }" +
                    "        .otp { font-size: 32px; letter-spacing: 3px; color: #2C3E50; font-weight: 700; margin: 10px 0; }" +
                    "        .instructions { font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 25px; }" +
                    "        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #EAEAEA; color: #777; font-size: 14px; }" +
                    "        .highlight { color: #E74C3C; font-weight: 600; }" +
                    "    </style>" +
                    "</head>" +
                    "<body>" +
                    "    <div class='container'>" +
                    "        <div class='header'>" +
                    "            <h1>MomentumMerge</h1>" +
                    "        </div>" +
                    "        <div class='content'>" +
                    "            <p class='greeting'>Dear " + name + ",</p>" +
                    "            <p class='instructions'>You have requested to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>" +
                    "            <div class='otp-container'>" +
                    "                <div class='otp'>" + otp + "</div>" +
                    "            </div>" +
                    "            <p class='instructions'>This OTP is valid for <span class='highlight'>2 minutes</span>. For security reasons, do not share this code with anyone.</p>" +
                    "            <p class='instructions'>If you did not request this, please ignore this email or contact support immediately.</p>" +
                    "        </div>" +
                    "        <div class='footer'>" +
                    "            <p>© 2025 MomentumMerge. All rights reserved.</p>" +
                    "        </div>" +
                    "    </div>" +
                    "</body>" +
                    "</html>";
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    

    
    @PostMapping("/admin-login")
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody Map<String, String> credentials,
                                           HttpSession session) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        if (adminConfig.getEmail().equals(email) && adminConfig.getPassword().equals(password)) {
            // Create a temporary admin user object for session
            User adminUser = new User();
            adminUser.setEmail(email);
            adminUser.setName(adminConfig.getName());
            adminUser.setRole("ADMIN");
            adminUser.setPhoneno(adminConfig.getPhone());
            adminUser.setId(0L); // Special ID for admin
            session.setAttribute("currentUser", adminUser);
            Map<String, Object> response = new HashMap<>();
            response.put("role", "ADMIN");
            response.put("name", adminConfig.getName());
            response.put("email", adminConfig.getEmail());
            response.put("phone", adminConfig.getPhone());
            response.put("userId", "ADMIN_001");
            response.put("message", "Admin login successful");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid admin credentials"));
    }
    @PostMapping("/recruiter-login")
    public ResponseEntity<Map<String, Object>> recruiterLogin(@RequestBody Map<String, String> credentials,
                                          HttpSession session) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Optional<Recruiter> recruiter = recruiterRepository.findByEmail(email);
        if (recruiter.isPresent() && recruiter.get().getPassword().equals(password)) {
            // ... existing code ...
            Map<String, Object> response = new HashMap<>();
            response.put("role", "RECRUITER");
            response.put("name", recruiter.get().getName());
            response.put("email", recruiter.get().getEmail());
            response.put("phone", recruiter.get().getPhone());
            response.put("userId", recruiter.get().getRecruiterId());
            response.put("recruiterId", recruiter.get().getRecruiterId());
            response.put("imageData", recruiter.get().getImageData()); // ADD THIS
            response.put("message", "Recruiter login successful");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid recruiter credentials"));
    }
@PostMapping("/recruiter-forgot-password")
    public ResponseEntity<String> recruiterForgotPassword(@RequestParam String email) {
        Optional<Recruiter> recruiter = recruiterRepository.findByEmail(email);
        if (recruiter.isPresent()) {
            String otp = generateOTP();
            otpStorage.put("recruiter_" + email, otp);
            sendRecruiterOtpEmail(email, otp, recruiter.get().getName());
            return ResponseEntity.ok("OTP sent to your email.");
        }
        return ResponseEntity.badRequest().body("Email not found in recruiter records.");
    }
    @PostMapping("/recruiter-reset-password")
    public ResponseEntity<String> recruiterResetPassword(@RequestParam String email, @RequestParam String otp, @RequestParam String newPassword) {
        Optional<Recruiter> recruiter = recruiterRepository.findByEmail(email);
        if (recruiter.isPresent() && otpStorage.containsKey("recruiter_" + email) && otpStorage.get("recruiter_" + email).equals(otp)) {
            recruiter.get().setPassword(newPassword);
            recruiterRepository.save(recruiter.get());
            otpStorage.remove("recruiter_" + email);
            return ResponseEntity.ok("Password reset successful.");
        }
        return ResponseEntity.badRequest().body("Invalid OTP or recruiter not found.");
    }
private void sendRecruiterOtpEmail(String email, String otp, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Recruiter Password Reset - Verification Code");
            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "    <meta charset='UTF-8'>" +
                    "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "    <style>" +
                    "        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #F5F7FA; color: #333; }" +
                    "        .container { max-width: 600px; margin: 20px auto; background: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; }" +
                    "        .header { background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); padding: 20px; text-align: center; }" +
                    "        .header h1 { color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 600; }" +
                    "        .content { padding: 30px; }" +
                    "        .greeting { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }" +
                    "        .otp-container { background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0; }" +
                    "        .otp { font-size: 36px; letter-spacing: 4px; color: #FFFFFF; font-weight: 700; margin: 10px 0; }" +
                    "        .instructions { font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 25px; }" +
                    "        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #EAEAEA; color: #777; font-size: 14px; }" +
                    "        .highlight { color: #667EEA; font-weight: 600; }" +
                    "        .recruiter-badge { background: #667EEA; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 15px; }" +
                    "    </style>" +
                    "</head>" +
                    "<body>" +
                    "    <div class='container'>" +
                    "        <div class='header'>" +
                    "            <h1>MomentumMerge</h1>" +
                    "        </div>" +
                    "        <div class='content'>" +
                    "            <div class='recruiter-badge'>RECRUITER ACCOUNT</div>" +
                    "            <p class='greeting'>Dear " + name + ",</p>" +
                    "            <p class='instructions'>You have requested to reset your recruiter account password. Please use the following verification code to proceed with your password reset:</p>" +
                    "            <div class='otp-container'>" +
                    "                <div class='otp'>" + otp + "</div>" +
                    "            </div>" +
                    "            <p class='instructions'>This verification code is valid for <span class='highlight'>2 minutes</span>. For security reasons, do not share this code with anyone.</p>" +
                    "            <p class='instructions'>If you did not request this password reset, please ignore this email or contact our support team immediately.</p>" +
                    "            <p class='instructions'><strong>Note:</strong> This is specifically for your recruiter account access. Regular user accounts have a separate password reset process.</p>" +
                    "        </div>" +
                    "        <div class='footer'>" +
                    "            <p>© 2025 MomentumMerge - Recruiter Portal. All rights reserved.</p>" +
                    "        </div>" +
                    "    </div>" +
                    "</body>" +
                    "</html>";
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    

    // ✅ Generate 6-digit OTP
    private String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999));
    }
}


