
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';
// import axios from 'axios';
// import '../Styles/RecruiterLogin.css';

// const RecruiterLogin = () => {
//     const navigate = useNavigate();
//   const [loginType, setLoginType] = useState('recruiter');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//       const API_BASE = process.env.REACT_APP_API_BASE_URL;

//     try {
//       const endpoint = loginType === 'admin' ? '/api/auth/admin-login' : '/api/auth/recruiter-login';
      
//       const response = await axios.post(
//         `${API_BASE}${endpoint}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data) {
//         // Store user data in localStorage
//         localStorage.setItem('userRole', response.data.role);
//         localStorage.setItem('userName', response.data.name);
//         localStorage.setItem('userEmail', response.data.email);
//         localStorage.setItem('userId', response.data.userId);
//         localStorage.setItem('userPhone', response.data.phone);
//         localStorage.setItem('userImage', response.data.imageData);
        
//         if (response.data.recruiterId) {
//           localStorage.setItem('recruiterId', response.data.recruiterId);
//         }

//         // Add slight delay before navigation
//         setTimeout(() => {
//           navigate('/recruiter-dashboard');
//           window.location.reload(); // Ensure full refresh to load dashboard
//         }, 100);
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.error || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <div className="mm-login-container">
//       <div className="mm-login-card">
//         {/* Logo and Brand Name Section */}
//         <div className="mm-brand-section">
//           <img src="/Logoo.png" alt="MomentumMerge Logo" className="mm-main-logo" />
//           <h1 className="mm-company-name">MomentumMerge</h1>
//         </div>

//         <h2 className="mm-login-title">Login to Dashboard</h2>
//         <p className="mm-login-subtitle">Access your recruiter or admin panel</p>

//         <div className="mm-role-tabs">
//           <button 
//             className={`mm-tab ${loginType === 'recruiter' ? 'active' : ''}`}
//             onClick={() => setLoginType('recruiter')}
//           >
//             <FiUser className="mm-tab-icon" />
//             Recruiter Login
//           </button>
//           <button 
//             className={`mm-tab ${loginType === 'admin' ? 'active' : ''}`}
//             onClick={() => setLoginType('admin')}
//           >
//             <FiShield className="mm-tab-icon" />
//             Admin Login
//           </button>
//         </div>

//         {error && <div className="mm-error-message">{error}</div>}

//         <form className="mm-login-form" onSubmit={handleSubmit}>
//           <div className="mm-form-group">
//             <label>Email Address</label>
//             <div className="mm-input-wrapper">
//               <FiMail className="mm-input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder={loginType === 'admin' ? 'admin@momentummerge.com' : 'your@email.com'}
//                 required
//               />
//             </div>
//           </div>

//           <div className="mm-form-group">
//             <label>Password</label>
//             <div className="mm-input-wrapper">
//               <FiLock className="mm-input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//               <button 
//                 type="button" 
//                 className="mm-password-toggle"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="mm-login-btn" disabled={loading}>
//             {loading ? 'Logging in...' : `Login as ${loginType === 'admin' ? 'Admin' : 'Recruiter'}`}
//           </button>
//         </form>

//         {loginType === 'recruiter' && (
//           <Link to="/recruiter-forgot-password" className="mm-forgot-link">
//             Forgot password?
//           </Link>
//         )}

//         {/* {loginType === 'admin' && (
//           <div className="mm-admin-note">
//             <FiShield className="mm-note-icon" />
//             <span>Admin password can be changed in application.properties</span>
//           </div>
//         )} */}

//         <div className="mm-footer-links">
//           <Link to="/" className="mm-footer-link">← Back to Home</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterLogin;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield, FiChevronDown, FiChevronUp, FiHelpCircle, FiCheck, FiUsers, FiTarget, FiZap, FiHeadphones } from 'react-icons/fi';
import axios from 'axios';
import '../Styles/RecruiterLogin.css';

const Recruiterlog = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('recruiter');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

    try {
      const endpoint = loginType === 'admin' ? '/api/auth/admin-login' : '/api/auth/recruiter-login';
      
      const response = await axios.post(
        `${API_BASE}${endpoint}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userPhone', response.data.phone);
        localStorage.setItem('userImage', response.data.imageData);
        
        if (response.data.recruiterId) {
          localStorage.setItem('recruiterId', response.data.recruiterId);
        }

        setTimeout(() => {
          navigate('/recruiter-dashboard');
          window.location.reload();
        }, 100);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "Do I need to pay to create a recruiter account?",
      answer: "No, creating a recruiter account is free. Some premium services may require a paid subscription."
    },
    {
      question: "Can I post multiple jobs at the same time?",
      answer: "Yes, you can post multiple jobs. The number of active job postings depends on your subscription plan."
    },
    {
      question: "How do I access candidate resumes?",
      answer: "Once you post a job, you'll receive applications directly. You can also access candidate resumes through our Resume Database (depending on your plan)."
    },
    {
      question: "How do I recover my account if I forget the password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password."
    },
    {
      question: "Is candidate data secure on the platform?",
      answer: "Yes, all candidate and recruiter data is securely stored and protected as per our Privacy Policy."
    },
    {
      question: "Do you provide customer support for recruiters?",
      answer: "Yes, we offer dedicated customer support for all recruiters with priority assistance for premium subscribers."
    }
  ];

  const benefits = [
    {
      icon: <FiZap />,
      title: "Quick Job Posting",
      description: "Post jobs in minutes with our streamlined process"
    },
    {
      icon: <FiCheck />,
      title: "Verified Candidates",
      description: "Access pre-screened and verified candidate profiles"
    },
    {
      icon: <FiTarget />,
      title: "AI-Powered Resume Matching",
      description: "Smart algorithms match the best candidates to your jobs"
    },
    {
      icon: <FiUsers />,
      title: "Easy Applicant Management",
      description: "Organize and track applications with intuitive tools"
    },
    {
      icon: <FiHeadphones />,
      title: "Dedicated Support",
      description: "24/7 customer support for all your recruiting needs"
    }
  ];

  return (
    <div className="rl-container">
      {/* Background Pattern */}
      <div className="rl-bg-pattern"></div>
      
      {/* Header with Logo */}
      <header className="rl-header">
        <div className="rl-logo-section">
          <img src="/Logoo.png" alt="MomentumMerge Logo" className="rl-logo" />
          <span className="rl-brand-name">MomentumMerge</span>
        </div>
      </header>

      <div className="rl-main-content">
        {/* Left Section - Login Form */}
        <div className="rl-left-section">
          <div className="rl-login-card">
            <div className="rl-form-header">
              <h1 className="rl-title">Welcome Back</h1>
              <p className="rl-subtitle">Sign in to your recruiter dashboard</p>
            </div>

            <div className="rl-role-tabs">
              <button 
                className={`rl-tab ${loginType === 'recruiter' ? 'active' : ''}`}
                onClick={() => setLoginType('recruiter')}
              >
                <FiUser className="rl-tab-icon" />
                Recruiter
              </button>
              <button 
                className={`rl-tab ${loginType === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginType('admin')}
              >
                <FiShield className="rl-tab-icon" />
                Admin
              </button>
            </div>

            {error && <div className="rl-error-message">{error}</div>}

            <form className="rl-login-form" onSubmit={handleSubmit}>
              <div className="rl-form-group">
                <label className="rl-label">Email Address</label>
                <div className="rl-input-wrapper">
                  <FiMail className="rl-input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={loginType === 'admin' ? 'admin@momentummerge.com' : 'your@email.com'}
                    className="rl-input"
                    required
                  />
                </div>
              </div>

              <div className="rl-form-group">
                <label className="rl-label">Password</label>
                <div className="rl-input-wrapper">
                  <FiLock className="rl-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="rl-input"
                    required
                  />
                  <button 
                    type="button" 
                    className="rl-password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>

              <button type="submit" className="rl-login-btn" disabled={loading}>
                {loading ? 'Signing in...' : `Sign in as ${loginType === 'admin' ? 'Admin' : 'Recruiter'}`}
              </button>
            </form>

            <div className="rl-form-footer">
              {loginType === 'recruiter' && (
                <Link to="/recruiter-forgot-password" className="rl-forgot-link">
                  Forgot your password?
                </Link>
              )}
              
              {loginType === 'recruiter' && (
                <div className="rl-register-section">
                  <span>Don't have an account? </span>
                  <Link to="/joinemployers" className="rl-register-link">
                    Register as Recruiter
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="rl-faq-section">
            <div className="rl-faq-header">
              <FiHelpCircle className="rl-faq-icon" />
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="rl-faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="rl-faq-item">
                  <button 
                    className="rl-faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    {expandedFAQ === index ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {expandedFAQ === index && (
                    <div className="rl-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Benefits & Illustration */}
        <div className="rl-right-section">
          <div className="rl-illustration-container">
            <div className="rl-hero-illustration">
              <svg viewBox="0 0 400 300" className="rl-main-svg">
                {/* Recruiter Illustration */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                
                {/* Background circles */}
                <circle cx="320" cy="80" r="60" fill="url(#gradient1)" opacity="0.1" />
                <circle cx="80" cy="220" r="40" fill="url(#gradient2)" opacity="0.1" />
                
                {/* Desk */}
                <rect x="50" y="180" width="300" height="80" rx="10" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2" />
                
                {/* Laptop */}
                <rect x="120" y="160" width="80" height="50" rx="5" fill="#343a40" />
                <rect x="125" y="165" width="70" height="40" rx="3" fill="#495057" />
                <rect x="130" y="170" width="60" height="30" rx="2" fill="#6c757d" />
                
                {/* Person (Recruiter) */}
                <circle cx="280" cy="120" r="25" fill="#ffc107" />
                <rect x="265" y="145" width="30" height="40" rx="5" fill="#17a2b8" />
                <rect x="260" y="155" width="10" height="25" rx="5" fill="#ffc107" />
                <rect x="290" y="155" width="10" height="25" rx="5" fill="#ffc107" />
                
                {/* Resume papers */}
                <rect x="220" y="170" width="25" height="30" rx="2" fill="white" stroke="#dee2e6" strokeWidth="1" />
                <rect x="245" y="175" width="25" height="30" rx="2" fill="white" stroke="#dee2e6" strokeWidth="1" />
                
                {/* Floating icons */}
                <circle cx="100" cy="80" r="15" fill="url(#gradient1)" opacity="0.8" />
                <circle cx="320" cy="200" r="12" fill="url(#gradient2)" opacity="0.8" />
              </svg>
            </div>
            
            <div className="rl-benefits-content">
              <h2 className="rl-benefits-title">Why Choose Our Platform?</h2>
              <p className="rl-benefits-subtitle">Join thousands of recruiters who trust us to find the perfect candidates</p>
              
              <div className="rl-benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="rl-benefit-item">
                    <div className="rl-benefit-icon">
                      {benefit.icon}
                    </div>
                    <div className="rl-benefit-content">
                      <h4 className="rl-benefit-title">{benefit.title}</h4>
                      <p className="rl-benefit-description">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="rl-footer">
        <Link to="/" className="rl-home-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Recruiterlog;