import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiKey, FiLock, FiCheck, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import "../Styles/ResetPassword.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    if (!email) {
      alert("Invalid Access! Redirecting to Forgot Password.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    
    // Validate password against criteria
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
      setPasswordError("Password does not meet all requirements");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", null, {
        params: { email, otp, newPassword }
      });
      alert("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Invalid OTP or Password Reset Failed!");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="reset-password-header">
          <Link to="/" className="logo-link">
            <img src="/Logoo.png" alt="Company Logo" className="company-logo" />
          </Link>
          <h1 className="company-name">MomentumMerge</h1>
        </div>

        <h2>Reset Password</h2>
        <p className="instruction-text">Enter the OTP sent to your email and set a new password</p>
        
        <form onSubmit={handleResetPassword}>
          <div className="input-wrapper">
            <FiKey className="input-icon" />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <span 
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="password-requirements">
            <h4>Password must include:</h4>
            <ul>
              <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
                {passwordRequirements.minLength ? <FiCheck /> : <FiX />}
                At least 8 characters
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

          {passwordError && <div className="error-message">{passwordError}</div>}
          
          <button 
            type="submit" 
            className="reset-btn"
            disabled={!isStrongPassword()}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;