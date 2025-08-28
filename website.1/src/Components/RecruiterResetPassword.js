import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiKey, FiLock, FiCheck, FiX, FiEye, FiEyeOff, FiClock } from "react-icons/fi";
import "../Styles/RecruiterResetPassword.css";

const RecruiterResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  // Password requirements
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Show notification function
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  // Timer countdown
  useEffect(() => {
    if (!email) {
      showNotification("Invalid Access! Redirecting to Recruiter Password Recovery.", "error");
      navigate("/recruiter-forgot-password");
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    
    setPasswordRequirements({
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password)
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isStrongPassword = () => {
    return Object.values(passwordRequirements).every(requirement => requirement);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!isStrongPassword()) {
      setPasswordError("Password does not meet all security requirements");
      return;
    }

    if (otpExpired) {
      setPasswordError("Verification code expired. Please request a new one.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/auth/recruiter-reset-password`, null, {
        params: { email, otp, newPassword }
      });
      showNotification("Password reset successful! Please login with your new password.", "success");
      setTimeout(() => {
        navigate("/recruiter-login");
      }, 500);
    } catch (error) {
      showNotification("Invalid verification code or password reset failed!", "error");
    }
  };

  const handleResendOTP = () => {
    navigate("/recruiter-forgot-password");
  };

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
    <div className="recruiter-reset-container">
      <div className="recruiter-reset-card">
        <div className="recruiter-reset-password-header">
          <Link to="/" className="logo-link">
            <img src="/Logoo.png" alt="Company Logo" className="company-logo" />
          </Link>
          <h1 className="company-name">MomentumMerge</h1>
        </div>

        <h2>Reset Recruiter Password</h2>
        <p className="instruction-text">Enter the verification code sent to your email and create a new secure password</p>
        
        <form onSubmit={handleResetPassword}>
          {/* OTP Input with Heading */}
          <div className="input-group">
            <label htmlFor="otp" className="input-label">Verification Code</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <FiKey className="input-icon" />
              <input
                id="otp"
                type="text"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={otpExpired}
              />
              <div className="timer-wrapper">
                <FiClock style={{ marginRight: '4px' }} />
                <span style={{ color: otpExpired ? "#e74c3c" : "#2c3e50" }}>
                  {otpExpired ? "Expired" : formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          {otpExpired && (
            <button
              type="button"
              onClick={handleResendOTP}
              className="resend-btn"
            >
              Request New Code
            </button>
          )}

          {/* Password Input with Heading */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">New Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create new secure password"
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
              <span 
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 
               <FiEye />  :  <FiEyeOff /> }
              </span>
            </div>
          </div>

          <div className="password-requirements">
            <h4>Password security requirements:</h4>
            <ul>
              <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
                {passwordRequirements.minLength ? <FiCheck /> : <FiX />}
                Minimum 8 characters
              </li>
              <li className={passwordRequirements.hasUpper ? "valid" : "invalid"}>
                {passwordRequirements.hasUpper ? <FiCheck /> : <FiX />}
                One uppercase letter
              </li>
              <li className={passwordRequirements.hasLower ? "valid" : "invalid"}>
                {passwordRequirements.hasLower ? <FiCheck /> : <FiX />}
                One lowercase letter
              </li>
              <li className={passwordRequirements.hasNumber ? "valid" : "invalid"}>
                {passwordRequirements.hasNumber ? <FiCheck /> : <FiX />}
                One number
              </li>
              <li className={passwordRequirements.hasSpecial ? "valid" : "invalid"}>
                {passwordRequirements.hasSpecial ? <FiCheck /> : <FiX />}
                One special character (@$!%*?&)
              </li>
            </ul>
          </div>

          {passwordError && (
            <div className="error-message">
              {passwordError}
            </div>
          )}
          
          <button 
            type="submit" 
            className="reset-btn"
            disabled={!isStrongPassword() || otpExpired}
          >
            Update Password
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

export default RecruiterResetPassword;