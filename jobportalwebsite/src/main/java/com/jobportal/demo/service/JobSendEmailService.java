//// JobSendEmailService.java
//package com.jobportal.demo.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JobSendEmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendJobApplicationConfirmation(String toEmail, String userName, 
//                                             String jobTitle, String companyName, 
//                                             String jobId, String jobLocation, 
//                                             String jobSalary, String jobExperience) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("pichukanaveen486@gmail.com");
//        message.setTo(toEmail);
//        message.setSubject("Your Application for " + jobTitle + " at " + companyName);
//        
//        String emailContent = "Dear " + userName + ",\n\n" +
//                "Thank you for applying for the position of " + jobTitle + " at " + companyName + ".\n\n" +
//                "Here are the details of your application:\n" +
//                "Job ID: " + jobId + "\n" +
//                "Position: " + jobTitle + "\n" +
//                "Company: " + companyName + "\n" +
//                "Location: " + jobLocation + "\n" +
//                "Salary: " + jobSalary + "\n" +
//                "Experience Required: " + jobExperience + "\n\n" +
//                "We have received your application and will review it shortly. " +
//                "If your profile matches our requirements, we will contact you for further steps.\n\n" +
//                "Best regards,\n" +
//                "The Hiring Team\n" +
//                companyName;
//        
//        message.setText(emailContent);
//        
//        mailSender.send(message);
//    }
//}




package com.jobportal.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class JobSendEmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendJobApplicationConfirmation(String toEmail, String userName, 
                                             String jobTitle, String companyName, 
                                             String jobId, String jobLocation, 
                                             String jobSalary, String jobExperience) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("pichukanaveen486@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Your Application for " + jobTitle + " at " + companyName);
        
        String emailContent = "Dear " + userName + ",\n\n" +
                "Thank you for applying for the position of " + jobTitle + " at " + companyName + ".\n\n" +
                "Here are the details of your application:\n" +
                "Job ID: " + jobId + "\n" +
                "Position: " + jobTitle + "\n" +
                "Company: " + companyName + "\n" +
                "Location: " + jobLocation + "\n" +
                "Salary: " + jobSalary + "\n" +
                "Experience Required: " + jobExperience + "\n\n" +
                "We have received your application and will review it shortly. " +
                "If your profile matches our requirements, we will contact you for further steps.\n\n" +
                "Best regards,\n" +
                "The Hiring Team\n" +
                companyName;
        
        message.setText(emailContent);
        
        mailSender.send(message);
    }

    // Shortlist Email
    public void sendShortlistEmail(String email, String name, String jobTitle, String companyName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(email);
            helper.setSubject("🎉 Congratulations! Your Resume has been Shortlisted - " + jobTitle);
            
            String emailBody = String.format("""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                            <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
                            <p style="margin: 10px 0 0 0; font-size: 18px;">Your Resume has been Shortlisted</p>
                        </div>
                        
                        <p>Dear <strong>%s</strong>,</p>
                        
                        <p>We are delighted to inform you that your resume has been <strong style="color: #28a745;">shortlisted</strong> 
                           for the position of <strong>%s</strong> at <strong>%s</strong>.</p>
                        
                        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #155724;">What's Next?</h3>
                            <ul style="color: #155724; margin: 0;">
                                <li>Our recruitment team will contact you within the next 2-3 business days</li>
                                <li>Please keep your phone accessible for our call</li>
                                <li>Prepare for potential technical/HR interviews</li>
                                <li>Keep your documents ready for verification</li>
                            </ul>
                        </div>
                        
                        <p>Your profile impressed our hiring team, and we look forward to discussing this opportunity with you in detail.</p>
                        
                        <p style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px;">
                            <strong>Important:</strong> Please respond to this email to confirm your continued interest in this position.
                        </p>
                        
                        <p>Thank you for choosing us as your preferred employer!</p>
                        
                        <br>
                        <p>Best regards,<br>
                        <strong>%s Recruitment Team</strong><br>
                        <em>We're excited to have you on board!</em></p>
                    </div>
                </body>
                </html>
                """, name, jobTitle, companyName, companyName);
            
            helper.setText(emailBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send shortlist email: " + e.getMessage());
        }
    }

    // Rejection Email
    public void sendRejectionEmail(String email, String name, String jobTitle, String companyName, String reason) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(email);
            helper.setSubject("Update on Your Job Application - " + jobTitle);

            String reasonText = (reason != null && !reason.trim().isEmpty()) ?
                String.format("""
                    <div style="background-color: #f8f9fa; border-left: 4px solid #6c757d; padding: 15px; margin: 20px 0;">
                        <h4 style="margin-top: 0; color: #495057;">Feedback from our Team:</h4>
                        <p style="margin: 0; color: #6c757d; font-style: italic;">%s</p>
                    </div>
                    """, reason) : "";

            String emailBody = String.format("""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #6c757d;">Thank you for your application</h2>
                        
                        <p>Dear <strong>%s</strong>,</p>
                        
                        <p>Thank you for your interest in the position of <strong>%s</strong> at <strong>%s</strong> 
                           and for taking the time to submit your application.</p>
                        
                        <p>After careful consideration of all applications, we have decided to move forward 
                           with candidates whose profiles more closely align with our current requirements for this specific role.</p>
                        
                        %s
                        
                        <div style="background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h4 style="margin-top: 0; color: #0066cc;">We encourage you to:</h4>
                            <ul style="color: #0066cc; margin: 0;">
                                <li>Continue exploring other opportunities with us</li>
                                <li>Apply for future positions that match your skills</li>
                                <li>Connect with us on LinkedIn for updates</li>
                                <li>Consider this as a learning experience</li>
                            </ul>
                        </div>
                        
                        <p>We genuinely appreciate the time and effort you invested in your application. 
                           Your skills and experience are valuable, and we wish you the very best in your job search.</p>
                        
                        <p>Please don't hesitate to apply for other suitable positions with us in the future.</p>
                        
                        <br>
                        <p>Best regards,<br>
                        <strong>%s Recruitment Team</strong><br>
                        <em>Wishing you success in your career journey!</em></p>
                    </div>
                </body>
                </html>
                """, name, jobTitle, companyName, reasonText, companyName);

            helper.setText(emailBody, true);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send rejection email: " + e.getMessage());
        }
    }

    // Interview Email
    public void sendInterviewEmail(String email, String name, String jobTitle, String companyName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(email);
            helper.setSubject("🎯 Interview Invitation - " + jobTitle + " at " + companyName);
            
            String emailBody = String.format("..."); // keep original HTML here (same fix as above)
            
            helper.setText(emailBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send interview email: " + e.getMessage());
        }
    }

    // Hired Email
    public void sendHiredEmail(String email, String name, String jobTitle, String companyName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(email);
            helper.setSubject("🎊 Congratulations! Job Offer - " + jobTitle + " at " + companyName);
            
            String emailBody = String.format("..."); // keep original HTML here (same fix as above)
            
            helper.setText(emailBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send hired email: " + e.getMessage());
        }
    }
}
