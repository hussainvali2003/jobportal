

import React, { useState } from 'react';
import { 
  FaUserTie, 
  FaEnvelope, 
  FaPhone, 
  FaBriefcase, 
  FaLinkedin,
  FaBuilding,
  FaGlobe,
  FaIndustry,
  FaUsers,
  FaMapMarkerAlt,
  FaMap,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaClock,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaRocket,
  FaBullseye,
  FaCalendarAlt
} from 'react-icons/fa';
import "../Styles/JoinAsEmployer.css";

const JoinAsEmployer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    linkedin: '',
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    companyState: '',
    companyCity: ''
  });

  const [popup, setPopup] = useState({
    show: false,
    type: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const industries = [
    "Information Technology (IT) / Software",
    "Business Process Outsourcing (BPO) / Call Center",
    "Banking / Finance / Insurance",
    "Healthcare / Hospital / Pharma",
    "Education / EdTech",
    "E-commerce / Retail",
    "Manufacturing / Engineering",
    "Logistics / Transportation / Supply Chain",
    "Construction / Real Estate",
    "Telecom / Networking",
    "Media / Advertising / PR",
    "Automobile / Auto Components",
    "Hospitality",
    "Other"
  ];

  const companySizes = [
    "Startup (1-50 employees)",
    "Mid-Level (51-500 employees)",
    "Large Scale / MNC (500+ employees)"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const benefits = [
    {
      icon: <FaUsers />,
      title: "Access Top Talent",
      description: "Reach a wide pool of verified professionals across industries.",
      color: "blue"
    },
    {
      icon: <FaSearch />,
      title: "Smarter Recruitment",
      description: "Advanced filters, resume matching, and AI-driven recommendations.",
      color: "green"
    },
    {
      icon: <FaClock />,
      title: "Faster Hiring",
      description: "Post jobs in minutes and start receiving applications instantly.",
      color: "orange"
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted by Employers",
      description: "Secure, reliable, and designed to support recruiters at every step.",
      color: "purple"
    }
  ];

  const faqData = [
    {
      question: "How do I register as an employer?",
      answer: "Fill out the partnership form, verify your details, and our team will approve your account."
    },
    {
      question: "Can multiple recruiters from one company join?",
      answer: "Yes, multiple team members can create recruiter profiles under the same company."
    },
    {
      question: "How soon can I start posting jobs?",
      answer: "Once your account is verified, you can start posting jobs immediately."
    },
    {
      question: "Is there a cost to register?",
      answer: "Registration is free. Premium plans are available for advanced features."
    },
    {
      question: "How is candidate data secured?",
      answer: "We use end-to-end encryption and comply with Indian data protection standards."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
  };

  const closePopup = () => {
    setPopup({ show: false, type: '', message: '' });
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const scrollToForm = () => {
    document.getElementById('partnership-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/recruiter-inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showPopup('success', 'Thank you! Our team will review your request and get in touch shortly.');
        setFormData({
          name: '', email: '', phone: '', designation: '', linkedin: '',
          companyName: '', companyWebsite: '', industry: '', companySize: '',
          companyState: '', companyCity: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showPopup('error', 'There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="jae-container">
      {/* Hero Section */}
      <section className="jae-hero">
        <div className="jae-hero-background">
          <div className="jae-hero-overlay"></div>
          <svg className="jae-hero-illustration" viewBox="0 0 800 400">
            {/* Hero SVG Illustration */}
            <defs>
              <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
              </linearGradient>
              <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            
            {/* Background elements */}
            <circle cx="700" cy="100" r="80" fill="url(#heroGradient1)" opacity="0.1" />
            <circle cx="100" cy="300" r="60" fill="url(#heroGradient2)" opacity="0.1" />
            
            {/* Office building */}
            <rect x="200" y="150" width="400" height="200" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="220" y="170" width="60" height="60" rx="5" fill="url(#heroGradient1)" />
            <rect x="300" y="170" width="60" height="60" rx="5" fill="url(#heroGradient2)" />
            <rect x="380" y="170" width="60" height="60" rx="5" fill="url(#heroGradient1)" />
            <rect x="460" y="170" width="60" height="60" rx="5" fill="url(#heroGradient2)" />
            
            {/* People silhouettes */}
            <circle cx="150" cy="280" r="20" fill="#4F46E5" />
            <rect x="135" y="300" width="30" height="40" rx="5" fill="#06B6D4" />
            
            <circle cx="650" cy="280" r="20" fill="#7C3AED" />
            <rect x="635" y="300" width="30" height="40" rx="5" fill="#3B82F6" />
          </svg>
        </div>
        
        <div className="jae-hero-content">
          <div className="jae-hero-text">
            <h1 className="jae-hero-title">Empower Your Hiring From Day One</h1>
            <p className="jae-hero-subtitle">
              Partner with us to connect with top talent, streamline recruitment, 
              and grow your team with confidence.
            </p>
            <button className="jae-hero-cta" onClick={scrollToForm}>
              Partner With Us Today <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="jae-benefits">
        <div className="jae-container-inner">
          <div className="jae-section-header">
            <h2 className="jae-section-title">Why Partner With Us</h2>
            <p className="jae-section-subtitle">
              Join thousands of companies who trust us to find the perfect candidates
            </p>
          </div>
          
          <div className="jae-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className={`jae-benefit-card ${benefit.color}`}>
                <div className="jae-benefit-icon">
                  {benefit.icon}
                </div>
                <h3 className="jae-benefit-title">{benefit.title}</h3>
                <p className="jae-benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="partnership-form" className="jae-form-section">
        <div className="jae-container-inner">
          <div className="jae-form-wrapper">
            <div className="jae-form-header">
              <h2 className="jae-form-title">Submit Your Partnership Request</h2>
              <p className="jae-form-subtitle">
                Complete the form to register your company and unlock access to premium hiring features.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="jae-form">
              {/* Recruiter Information */}
              <div className="jae-form-section-group">
                <h3 className="jae-form-section-title">
                  <FaUserTie className="jae-section-icon" /> 
                  Recruiter Information
                </h3>
                
                <div className="jae-form-grid">
                  <div className="jae-form-group">
                    <label htmlFor="name">
                      <FaUserTie className="jae-input-icon" /> Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="email">
                      <FaEnvelope className="jae-input-icon" /> Work Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="phone">
                      <FaPhone className="jae-input-icon" /> Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="designation">
                      <FaBriefcase className="jae-input-icon" /> Job Title*
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="HR Manager / Talent Acquisition"
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group jae-full-width">
                    <label htmlFor="linkedin">
                      <FaLinkedin className="jae-input-icon" /> LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>
                </div>
              </div>
              
              {/* Company Information */}
              <div className="jae-form-section-group">
                <h3 className="jae-form-section-title">
                  <FaBuilding className="jae-section-icon" /> 
                  Company Information
                </h3>
                
                <div className="jae-form-grid">
                  <div className="jae-form-group">
                    <label htmlFor="companyName">
                      <FaBuilding className="jae-input-icon" /> Company Name*
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company Pvt. Ltd."
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="companyWebsite">
                      <FaGlobe className="jae-input-icon" /> Company Website*
                    </label>
                    <input
                      type="url"
                      id="companyWebsite"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      required
                    />
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="industry">
                      <FaIndustry className="jae-input-icon" /> Industry*
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="companySize">
                      <FaUsers className="jae-input-icon" /> Company Size*
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Company Size</option>
                      {companySizes.map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="companyState">
                      <FaMap className="jae-input-icon" /> Company State*
                    </label>
                    <select
                      id="companyState"
                      name="companyState"
                      value={formData.companyState}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="jae-form-group">
                    <label htmlFor="companyCity">
                      <FaMapMarkerAlt className="jae-input-icon" /> Company City*
                    </label>
                    <input
                      type="text"
                      id="companyCity"
                      name="companyCity"
                      value={formData.companyCity}
                      onChange={handleChange}
                      placeholder="Enter city name"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="jae-form-actions">
                <button type="submit" className="jae-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
                  <FaArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="jae-faq">
        <div className="jae-container-inner">
          <div className="jae-section-header">
            <h2 className="jae-section-title">Recruiter FAQs</h2>
            <p className="jae-section-subtitle">
              Get answers to common questions about our platform
            </p>
          </div>
          
          <div className="jae-faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className="jae-faq-item">
                <button 
                  className="jae-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {expandedFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedFAQ === index && (
                  <div className="jae-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
<section className="jae-final-cta">
  <div className="jae-container-inner">
    <div className="jae-cta-content">
      <div className="jae-cta-text">
        <h2 className="jae-cta-title">
          Build Your <span className="jae-gradient-text">Dream Team</span> Faster
        </h2>
        <p className="jae-cta-subtitle">
          Transform the way your organization attracts, engages, and hires talent. 
          From startups to enterprises, we empower every business to hire smarter.
        </p>
        
        <div className="jae-cta-benefits">
          <div className="jae-benefit-point">
            <div className="jae-benefit-icon">
              <FaRocket />
            </div>
            <div className="jae-benefit-text">Faster Hiring</div>
          </div>
          <div className="jae-benefit-point">
            <div className="jae-benefit-icon">
              <FaBullseye />
            </div>
            <div className="jae-benefit-text">Smarter Matches</div>
          </div>
          <div className="jae-benefit-point">
            <div className="jae-benefit-icon">
              <FaShieldAlt />
            </div>
            <div className="jae-benefit-text">Secure Platform</div>
          </div>
        </div>
        
        <div className="jae-cta-buttons">
          <button className="jae-cta-primary" onClick={scrollToForm}>
            Get Started Today <FaArrowRight />
          </button>
          {/* <button className="jae-cta-secondary">
            Book a Demo <FaCalendarAlt />
          </button> */}
        </div>
      </div>
      
      <div className="jae-cta-illustration">
        <svg viewBox="0 0 400 350" className="jae-cta-svg">
          <defs>
            <linearGradient id="ctaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="ctaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#1D4ED8', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="ctaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          
          {/* Background circles */}
          <circle cx="200" cy="175" r="120" fill="rgba(16, 185, 129, 0.1)" />
          <circle cx="200" cy="175" r="80" fill="rgba(59, 130, 246, 0.1)" />
          
          {/* Main illustration - Handshake/Partnership */}
          <g transform="translate(100, 80)">
            {/* Left person */}
            <circle cx="50" cy="60" r="25" fill="url(#ctaGradient1)" />
            <rect x="35" y="85" width="30" height="50" rx="15" fill="url(#ctaGradient1)" />
            <rect x="20" y="100" width="15" height="30" rx="7" fill="url(#ctaGradient1)" />
            
            {/* Right person */}
            <circle cx="150" cy="60" r="25" fill="url(#ctaGradient2)" />
            <rect x="135" y="85" width="30" height="50" rx="15" fill="url(#ctaGradient2)" />
            <rect x="165" y="100" width="15" height="30" rx="7" fill="url(#ctaGradient2)" />
            
            {/* Handshake */}
            <ellipse cx="100" cy="110" rx="20" ry="8" fill="url(#ctaGradient3)" />
            
            {/* Success indicators */}
            <circle cx="100" cy="40" r="12" fill="#10B981" />
            <path d="M96 40 L99 43 L104 36" stroke="white" strokeWidth="2" fill="none" />
          </g>
          
          {/* Floating elements */}
          <circle cx="80" cy="100" r="8" fill="rgba(16, 185, 129, 0.3)">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="120" r="6" fill="rgba(59, 130, 246, 0.3)">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0; 0,-8; 0,0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="250" r="10" fill="rgba(139, 92, 246, 0.3)">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0; 0,-12; 0,0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Connection lines */}
          <path d="M 50 300 Q 200 250 350 300" stroke="rgba(255, 255, 255, 0.2)" 
            strokeWidth="2" fill="none" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0; 10" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    </div>
  </div>
</section>

      {/* Popup Modal */}
      {popup.show && (
        <div className="jae-popup-overlay" onClick={closePopup}>
          <div className="jae-popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="jae-popup-header">
              <div className={`jae-popup-icon ${popup.type}`}>
                {popup.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              </div>
              <button className="jae-popup-close" onClick={closePopup}>
                <FaTimes />
              </button>
            </div>
            <div className="jae-popup-content">
              <h3 className="jae-popup-title">
                {popup.type === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="jae-popup-message">{popup.message}</p>
            </div>
            <div className="jae-popup-actions">
              <button className="jae-popup-btn" onClick={closePopup}>
                {popup.type === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinAsEmployer;