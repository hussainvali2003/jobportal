
import React, { useState, useEffect } from "react";
import axios from "axios";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP, 3 = Verified
  const [message, setMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/send-email-otp`,
        null,
        { params: { email } }
      );
      setMessage(response.data);
      setStep(2);
      setResendCooldown(60);
    } catch (error) {
      setMessage(error.response?.data || "Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/verify-email-otp`,
        null,
        {
          params: { email, otp },
        }
      );
      if (response.data.verified) {
        setMessage("✅ Email verified successfully!");
        setStep(3);
      } else {
        setMessage("❌ Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.verified === false
        ? "❌ Invalid OTP. Please try again."
        : "❌ Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="email-verification">
      <h2>Email Verification</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <button
            onClick={handleSendOtp}
            disabled={resendCooldown > 0 || !email}
            style={{
              padding: "8px 16px",
              cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
            }}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter the 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            style={{ padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <button
            onClick={handleVerifyOtp}
            disabled={!otp}
            style={{ padding: "8px 16px" }}
          >
            Verify OTP
          </button>
          <br />
          <button
            onClick={handleSendOtp}
            disabled={resendCooldown > 0}
            style={{
              padding: "8px 16px",
              marginTop: "10px",
              cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
            }}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend OTP"}
          </button>
        </>
      )}

      {step === 3 && (
        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          ✅ Your email has been verified successfully! 🎉
        </p>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EmailVerification;


