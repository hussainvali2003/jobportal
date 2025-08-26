import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiHome, FiArrowLeft } from 'react-icons/fi';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="mm-login-container">
      <div className="mm-login-card">
        {/* Logo and Brand Name Section */}
        <div className="mm-brand-section">
          <img src="/Logoo.png" alt="MomentumMerge Logo" className="mm-main-logo" />
          <h1 className="mm-company-name">MomentumMerge</h1>
        </div>

        <div className="mm-unauthorized-content">
          <div className="mm-unauthorized-icon">
            <FiShield size={64} color="#dc3545" />
          </div>
          
          <h2 className="mm-login-title">Access Denied</h2>
          <p className="mm-login-subtitle">
            You don't have permission to access this page.
          </p>
          
          <div className="mm-unauthorized-message">
            <p>This page is restricted to authorized users only.</p>
            <p>Please log in with the appropriate credentials or contact your administrator.</p>
          </div>

          <div className="mm-unauthorized-actions">
            <button 
              className="mm-login-btn mm-back-btn" 
              onClick={goBack}
            >
              <FiArrowLeft size={16} />
              Go Back
            </button>
            
            <Link to="/" className="mm-login-btn mm-home-btn">
              <FiHome size={16} />
              Go Home
            </Link>
          </div>

          <div className="mm-login-options">
            <h4>Login Options:</h4>
            <div className="mm-login-links">
              <Link to="/admin-login" className="mm-footer-link">
                Admin Login
              </Link>
              <Link to="/recruiter-login" className="mm-footer-link">
                Recruiter Login
              </Link>
              <Link to="/login" className="mm-footer-link">
                User Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;