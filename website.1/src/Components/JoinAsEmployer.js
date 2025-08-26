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
  FaExclamationTriangle
} from 'react-icons/fa';
import "../Styles/JoinAsEmployer.css";

const JoinAsEmployer = () => {
  const [formData, setFormData] = useState({
    // Recruiter Information
    name: '',
    email: '',
    phone: '',
    designation: '',
    linkedin: '',
    
    // Company Information
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    companyState: '',
    companyCity: ''
  });

  const [popup, setPopup] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: '',
      message: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/recruiter-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showPopup('success', 'Thank you for your submission! Our team will contact you shortly.');
        setFormData({
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
    <div className="join-employer-container">
      <div className="join-employer-card">
        <div className="form-header">
          <h1 className="join-employer-title">
            <FaBuilding className="header-icon" /> Partner With Us
          </h1>
          <p className="join-employer-subtitle">
            Complete this form to register your company and start hiring top talent
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="join-employer-form">
          {/* Recruiter Information Section */}
          <div className="form-section">
            <h2 className="section-title">
              <FaUserTie className="section--title-icon" /> Recruiter Information
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUserTie className="input--icon" /> Full Name*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input--icon" /> Work Email*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone className="input--icon" /> Phone Number*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="designation">
                  <FaBriefcase className="input--icon" /> Job Title*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin">
                  <FaLinkedin className="input--icon" /> LinkedIn Profile
                </label>
                <div className="input-with-icon">
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
          </div>
          
          {/* Company Information Section */}
          <div className="form-section">
            <h2 className="section-title">
              <FaBuilding className="section--title-icon" /> Company Information
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName">
                  <FaBuilding className="input--icon" /> Company Name*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="companyWebsite">
                  <FaGlobe className="input--icon" /> Company Website*
                </label>
                <div className="input-with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="industry">
                  <FaIndustry className="input--icon" /> Industry*
                </label>
                <div className="select--with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="companySize">
                  <FaUsers className="input--icon" /> Company Size*
                </label>
                <div className="select--with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="companyState">
                  <FaMap className="input--icon" /> Company State*
                </label>
                <div className="select--with-icon">
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
              </div>
              
              <div className="form-group">
                <label htmlFor="companyCity">
                  <FaMapMarkerAlt className="input--icon" /> Company City*
                </label>
                <div className="input-with-icon">
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
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
            </button>
          </div>
        </form>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <div className={`popup-icon ${popup.type}`}>
                {popup.type === 'success' ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationTriangle />
                )}
              </div>
              <button className="popup-close" onClick={closePopup}>
                <FaTimes />
              </button>
            </div>
            <div className="popup-content">
              <h3 className="popup-title">
                {popup.type === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="popup-message">{popup.message}</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn" onClick={closePopup}>
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