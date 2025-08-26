import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "../Styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", null, { params: { email } });
      alert("OTP sent to your email");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      alert("Email not found");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {/* Added company logo and name */}
        <div className="forgot-password-header">
          <Link to="/" className="logo-link">
            <img src="/Logoo.png" alt="Company Logo" className="company-logo" />
          </Link>
          <h1 className="company-name">MomentumMerge</h1>
        </div>

        <h2>Forgot Password</h2>
        <p className="instruction-text">Enter your registered email to receive OTP</p>
        
        <form onSubmit={handleForgotPassword}>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="request-otp-btn">
            Request OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;