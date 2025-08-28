
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import "../Styles/RecruiterForgetPassword.css";

const RecruiterForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Show notification function
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/auth/recruiter-forgot-password`, null, { params: { email } });
      showNotification("OTP sent to your registered email address", "success");
      setTimeout(() => {
        navigate(`/recruiter-reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (error) {
      showNotification("Email not found in recruiter records", "error");
    }
  };

  const NotificationToast = ({ notification, onClose }) => {
    if (!notification) return null;

    const getIcon = () => {
      switch (notification.type) {
        case 'success':
          return <FiCheck style={{ color: '#27ae60', fontSize: '20px' }} />;
        case 'error':
          return <FiX style={{ color: '#e74c3c', fontSize: '20px' }} />;
        default:
          return <FiCheck style={{ color: '#3498db', fontSize: '20px' }} />;
      }
    };

    const getBackgroundColor = () => {
      switch (notification.type) {
        case 'success':
          return 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
        case 'error':
          return 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
        default:
          return 'linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)';
      }
    };

    const getTextColor = () => {
      switch (notification.type) {
        case 'success':
          return '#155724';
        case 'error':
          return '#721c24';
        default:
          return '#0c5460';
      }
    };

    const getBorderColor = () => {
      switch (notification.type) {
        case 'success':
          return '#28a745';
        case 'error':
          return '#dc3545';
        default:
          return '#17a2b8';
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        background: getBackgroundColor(),
        color: getTextColor(),
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: `1px solid ${getBorderColor()}`,
        borderLeft: `4px solid ${getBorderColor()}`,
        minWidth: '320px',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideInFromRight 0.3s ease-out',
        backdropFilter: 'blur(10px)'
      }}>
        {getIcon()}
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          lineHeight: '1.4',
          flex: 1
        }}>
          {notification.message}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            opacity: 0.7,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.background = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7';
            e.target.style.background = 'none';
          }}
        >
          <FiX style={{ fontSize: '16px' }} />
        </button>
        
        <style jsx>{`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @media (max-width: 480px) {
            div {
              left: 10px !important;
              right: 10px !important;
              minWidth: auto !important;
              maxWidth: none !important;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="recruiter-forgot-password-container">
      <div className="recruiter-forgot-password-box">
        {/* Added company logo and name */}
        <div className="recruiter-forgot-password-header">
          <Link to="/" className="logo-link">
            <img src="/Logoo.png" alt="Company Logo" className="company-logo" />
          </Link>
          <h1 className="company-name">MomentumMerge</h1>
        </div>

        <h2>Recruiter Password Recovery</h2>
        <p className="instruction-text">Enter your registered recruiter email to receive verification code</p>
        
        <form onSubmit={handleForgotPassword}>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your recruiter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="request-otp-btn">
            Send Verification Code
          </button>
        </form>
        
        <div className="login-links">
          <Link to="/recruiter-login" className="back-to-login">
            Back to Recruiter Login
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      <NotificationToast 
        notification={notification} 
        onClose={() => setNotification(null)} 
      />
    </div>
  );
};

export default RecruiterForgetPassword;