package com.jobportal.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
        }
    }
    public void sendPhoneVerificationOTP(String email, String name, String phone, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Phone Verification OTP - MomentumMerge");
            String htmlContent = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #F5F7FA; }
                        .container { max-width: 600px; margin: 20px auto; background: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                        .header { background-color: #2C3E50; padding: 20px; text-align: center; color: white; }
                        .content { padding: 30px; }
                        .otp-box { background: #F8F9FA; padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
                        .otp-code { font-size: 32px; letter-spacing: 5px; color: #2C3E50; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Phone Verification</h1>
                        </div>
                        <div class='content'>
                            <h2>Hello %s,</h2>
                            <p>Your OTP for verifying phone number %s is:</p>
                            <div class='otp-box'>
                                <div class='otp-code'>%s</div>
                            </div>
                            <p><strong>Note:</strong> This OTP will expire in 10 minutes.</p>
                        </div>
                    </div>
                </body>
                </html>
            """, name, phone, otp);
            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println(":white_check_mark: Phone verification OTP email sent successfully to " + email);
        } catch (Exception e) {
            System.err.println(":x: Error sending phone verification OTP email: " + e.getMessage());
            throw new RuntimeException("Failed to send phone verification OTP email", e);
        }
    }
    
    
    public void sendRecruiterCredentialsEmail(String email, String name, String recruiterId, String password) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(email);
            helper.setSubject("Welcome to MomentumMerge - Your Recruiter Account");

            String htmlContent = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa; }
                        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                        .header { background-color: #2c3e50; padding: 20px; text-align: center; color: white; }
                        .content { padding: 30px; }
                        .credentials { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; }
                        .button { display: inline-block; background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Welcome to MomentumMerge</h1>
                        </div>
                        <div class='content'>
                            <h2>Hello %s,</h2>
                            <p>Your recruiter account has been created successfully. Here are your login credentials:</p>
                            
                            <div class='credentials'>
                                <p><strong>Recruiter ID:</strong> %s</p>
                                <p><strong>Email:</strong> %s</p>
                                <p><strong>Initial Password:</strong> %s</p>
                            </div>
                            
                            <p><strong>Important:</strong> Please change your password after your first login for security.</p>
                            
                           
                        </div>
                    </div>
                </body>
                </html>
            """, name, recruiterId, email, password);

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("✅ Recruiter credentials email sent successfully to " + email);
        } catch (Exception e) {
            System.err.println("❌ Error sending recruiter credentials email: " + e.getMessage());
            throw new RuntimeException("Failed to send recruiter credentials email", e);
        }
    }
    
}
