package com.jobportal.demo.service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.demo.config.TwilioConfig;
import com.jobportal.demo.entity.User;
import com.jobportal.demo.repository.UserRepository;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;



@Service
public class SmsOtpService {
    private final UserRepository userRepository;
	
	private final TwilioConfig twilioConfig;
    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();
    // OTP expiration time in minutes
    private static final long OTP_EXPIRATION_MINUTES = 5;
    @Autowired
    public SmsOtpService(TwilioConfig twilioConfig, UserRepository userRepository) {
        this.twilioConfig = twilioConfig;
        this.userRepository = userRepository;
    }
    public String sendOtpSms(String phoneNumber) {
        try {
            // Normalize phone number to ensure consistent format
            String normalizedPhone = normalizePhoneNumber(phoneNumber);
            // Generate 6-digit OTP
            String otp = String.format("%06d", new Random().nextInt(1_000_000));
            // Send SMS via Twilio
            Message message = Message.creator(
                new com.twilio.type.PhoneNumber(normalizedPhone),
                new PhoneNumber(twilioConfig.getPhoneNumber()),
                "Your OTP is: " + otp
            ).create();
            // Store OTP with expiration
            otpStore.put(normalizedPhone, new OtpData(otp));
            // Log for debugging
            System.out.println("OTP sent to " + normalizedPhone + " | OTP: " + otp);
            System.out.println("Current OTP Store: " + otpStore);
            return "OTP sent to " + normalizedPhone;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage(), e);
        }
    }
    public boolean verifyOtp(String phoneNumber, String enteredOtp) {
        try {
            String normalizedPhone = normalizePhoneNumber(phoneNumber);
            // Get OTP data from store
            OtpData otpData = otpStore.get(normalizedPhone);
            // Log for debugging
            System.out.println("Verification attempt for " + normalizedPhone);
            System.out.println("Stored OTP: " + (otpData != null ? otpData.otp : "null"));
            System.out.println("Entered OTP: " + enteredOtp);
            // Check if OTP exists and is valid
            if (otpData == null) {
                System.out.println("No OTP found for " + normalizedPhone);
                return false;
            }
            // Check if OTP matches and is not expired
            if (otpData.isExpired()) {
                System.out.println("OTP expired for " + normalizedPhone);
                otpStore.remove(normalizedPhone);
                return false;
            }
            if (otpData.otp.equals(enteredOtp)) {
                // Remove OTP after successful verification
                otpStore.remove(normalizedPhone);
                User user=userRepository.findByPhoneno(phoneNumber).orElseThrow(()->new RuntimeException("Number Not found"));
                user.setPhoneVerified(true);
                userRepository.save(user);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error verifying OTP: " + e.getMessage(), e);
        }
    }
    private String normalizePhoneNumber(String phoneNumber) {
        // Remove all non-digit characters
        String digits = phoneNumber.replaceAll("[^0-9]", "");
        // Handle Indian numbers (add +91 if not present)
        if (digits.length() == 10) {
            return "+91" + digits;
        } else if (digits.startsWith("91") && digits.length() == 11) {
            return "+" + digits;
        } else if (digits.startsWith("91") && digits.length() == 12) {
            return "+" + digits;
        }
        // Return as-is if already in international format
        return phoneNumber.startsWith("+") ? phoneNumber : "+" + phoneNumber;
    }
    // Inner class to store OTP with timestamp
    private static class OtpData {
        String otp;
        long createdAt;
        OtpData(String otp) {
            this.otp = otp;
            this.createdAt = System.currentTimeMillis();
        }
        boolean isExpired() {
            long elapsedMinutes = TimeUnit.MILLISECONDS.toMinutes(
                System.currentTimeMillis() - createdAt);
            return elapsedMinutes >= OTP_EXPIRATION_MINUTES;
        }
    }
}