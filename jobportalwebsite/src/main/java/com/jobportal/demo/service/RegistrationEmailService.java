package com.jobportal.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class RegistrationEmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationSuccessEmail(String toEmail, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Welcome to MomentumMerge — Empowering Your Career!");

            String htmlContent = """
                <html>
                <body style='font-family: "Segoe UI", sans-serif; background-color: #F4F4F4; padding: 40px;'>
                    <div style='background-color: #FFFFFF; padding: 40px 30px; max-width: 650px; margin: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;'>
                        <img src='cid:logoCID' alt='MomentumMerge Logo' style='width: 300px; margin-bottom: 30px; border-radius: 10px;' />
                        <h1 style='color: #2C3E50; margin-bottom: 10px;'>Welcome to MomentumMerge!</h1>
                        <p style='font-size: 18px; color: #333;'>Hi <strong>%s</strong>,</p>
                        <p style='font-size: 16px; color: #555; line-height: 1.6;'>
                            We're excited to have you join our professional job seeker community.
                            Your registration was successful, and your journey toward meaningful opportunities begins here.
                        </p>
                        <p style='font-size: 16px; color: #555; line-height: 1.6;'>
                            Explore top job openings, tailor your profile to industry demands, and get discovered by leading employers.
                        </p>
                        <a href='' style='display: inline-block; margin-top: 20px; background-color: #0056B3; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 6px;'>Log in and Get Started</a>
                        <p style='margin-top: 20px; font-size: 14px; color: #777;'>
                            Have questions? Reach us anytime at <a href='mailto:support@momentum-merge.com' style='color: #0056B3;'>support@momentum-merge.com</a>.
                        </p>
                        <p style='font-size: 14px; color: #888; margin-top: 30px;'>Wishing you a successful career journey!<br><em>— The MomentumMerge Team</em></p>
                        <hr style='margin: 40px 0; border: none; border-top: 1px solid #eee;' />
                        <p style='font-size: 12px; color: #aaa;'>&copy; 2025 MomentumMerge. All rights reserved.</p>
                    </div>
                </body>
                </html>
                """.formatted(userName);

            helper.setText(htmlContent, true);

            ClassPathResource image = new ClassPathResource("static/office.jpg");
            if (!image.exists()) {
                System.err.println("⚠️ Image not found at expected path.");
            }
            helper.addInline("logoCID", image);

            mailSender.send(message);
            System.out.println("✅ Registration email sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Error sending registration email: " + e.getMessage());
        }
    }
}
