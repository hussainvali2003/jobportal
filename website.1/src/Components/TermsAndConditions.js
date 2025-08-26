import React from 'react';
import '../Styles/TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
      </div>

      <div className="terms-content">

        <div className="terms-section">
            <p>
            These Terms and Conditions ("Terms") govern your access to and use of the MomentumMerge platform ("Platform"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Platform.
          </p>
          <h2>1. Definitions</h2>
          <ul>
            <li><strong>"MomentumMerge"</strong> refers to MomentumMerge Pvt. Ltd.</li>
            <li><strong>"User", "Job Seeker", or "You"</strong> refers to individuals registering or using the website for employment-related purposes.</li>
            <li><strong>"Recruiter" or "Employer"</strong> refers to any company, recruiter, or HR personnel authorized to post job opportunities.</li>
            <li><strong>"Account"</strong> refers to the registered user profile created on the platform.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>2. Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old to use this platform.</li>
            <li>By registering, you confirm that you are legally capable of entering into binding contracts under applicable laws.</li>
            <li>The platform is intended only for individuals seeking employment and employers seeking candidates. It must not be used for any other commercial or non-recruitment purposes.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. User Registration and Profile Creation</h2>
          <ul>
            <li>You must register using accurate, complete, and verifiable information.</li>
            <li>You agree to maintain only one active account. Creating duplicate or fake accounts is strictly prohibited.</li>
            <li>You are responsible for safeguarding your login credentials. MomentumMerge is not liable for unauthorized access resulting from user negligence.</li>
            <li>You are responsible for updating your profile regularly to ensure that your information remains current.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. User Documents and Uploads</h2>
          <ul>
            <li>You may be required to upload documents such as resumes, photos, educational qualifications, experience letters, and identity proof.</li>
            <li>You affirm that all uploaded documents are original, accurate, and legally yours to share.</li>
            <li>Any attempt to upload fake, altered, plagiarized, or misleading documents is considered a violation and may lead to account suspension or legal action.</li>
            <li>Uploaded documents are stored securely and only shared with authorized recruiters as per your profile visibility settings.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. Acceptable Use Policy</h2>
          <p>You agree to use the website only for lawful and appropriate purposes. You may not:</p>
          <ul>
            <li>Upload viruses, malware, or malicious software.</li>
            <li>Send spam, phishing messages, or unsolicited promotions.</li>
            <li>Misrepresent your identity, education, or experience.</li>
            <li>Harass, threaten, or abuse other users or recruiters.</li>
            <li>Violate the privacy, rights, or reputation of other individuals.</li>
            <li>Use bots, crawlers, or automated scripts to collect data.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>6. Recruiter and Job Listing Interaction</h2>
          <ul>
            <li>Applying to a job does not guarantee a response, interview, or selection.</li>
            <li>Job offers, interviews, and follow-ups are solely the responsibility of the recruiting organization.</li>
            <li>MomentumMerge does not verify or guarantee the authenticity of every recruiter or job posting, though best efforts are made to vet recruiters.</li>
            <li>If you encounter fraudulent listings, report them to support@momentum-merge.com.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>7. Privacy and Data Protection</h2>
          <ul>
            <li>Your data is handled in accordance with our Privacy Policy.</li>
            <li>Uploaded documents are stored securely and shared only as necessary for the hiring process.</li>
            <li>We implement strict security measures including encryption, access controls, and data backups to protect your information.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>8. Cookies and Tracking Technologies</h2>
          <ul>
            <li>We use cookies to personalize your experience, store login sessions, and analyze platform traffic.</li>
            <li>By using the site, you consent to our use of cookies as outlined in our Cookie Policy.</li>
            <li>You may manage cookies through your browser settings, though some features may not function correctly if disabled.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>9. Intellectual Property</h2>
          <ul>
            <li>All platform content (text, logos, code, designs, graphics, job listings, and database) is the intellectual property of MomentumMerge.</li>
            <li>You may not copy, modify, distribute, or republish any content without our prior written permission.</li>
            <li>Recruiter content (job descriptions, logos, etc.) remains the property of the respective employers and is used here with authorization.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>10. Termination and Suspension</h2>
          <ul>
            <li>We reserve the right to suspend or permanently terminate your account if you violate these Terms.</li>
            <li>Reasons for termination include, but are not limited to:
              <ul>
                <li>Uploading fraudulent documents</li>
                <li>Harassing other users</li>
                <li>Engaging in unlawful activity</li>
                <li>Repeated profile misuse</li>
              </ul>
            </li>
            <li>You may deactivate your account at any time. Data deletion timelines and rights are covered in our Privacy Policy.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>11. Third-Party Services</h2>
          <ul>
            <li>Some services may be powered by third-party platforms (e.g., for cloud storage, resume parsing, or payment handling).</li>
            <li>MomentumMerge is not responsible for third-party content, advertisements, or terms of use.</li>
            <li>Use of third-party services is at your own risk and subject to their respective policies.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>12. Limitation of Liability</h2>
          <ul>
            <li>MomentumMerge acts as an intermediary platform and is not responsible for the final outcome of any job application.</li>
            <li>We do not promise employment, selection, or salary assurance.</li>
            <li>Under no circumstance shall MomentumMerge be liable for indirect, incidental, or consequential damages arising from the use of the platform.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>13. Disclaimer</h2>
          <ul>
            <li>We do not warrant the accuracy, reliability, or completeness of information provided by users or recruiters.</li>
            <li>MomentumMerge does not guarantee uninterrupted access to the platform and is not liable for downtime, data loss, or technical interruptions.</li>
            <li>All services are provided "as is" and "as available."</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>14. Modifications and Updates</h2>
          <ul>
            <li>We reserve the right to update these Terms at any time without prior notice.</li>
            <li>Users will be notified of significant changes via email or on the platform.</li>
            <li>Continued use of the platform after changes are posted constitutes your acceptance of the revised Terms.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>15. Governing Law and Jurisdiction</h2>
          <ul>
            <li>These Terms shall be governed by and construed in accordance with the laws of India.</li>
            <li>Any disputes arising shall be subject to the jurisdiction of the courts located in [Insert City, e.g., Bengaluru].</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;