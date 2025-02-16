import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forgotpassword.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
     
  
    
      const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
      const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
    
      // Redirect if no logged-in user or incorrect role
      if (loggedInEmail || userRole ) {
        navigate("/", { replace: true });
        return;
      }
    
      
    }, [navigate]);

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ 1️⃣ Send OTP
  const sendOtp = async () => {
    if (!email) {
      setError("Email field is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/forgotpassword", { email });
      setOtpSent(true);
      setMessage(response.data);
      setError("");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // ✅ 2️⃣ Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      setError("OTP field is required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/verify-otp", { email, otp });
      if (response.data === "OTP verified!") {
        setOtpVerified(true);
        setMessage("OTP verified successfully! You can now reset your password.");
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP.");
    }
  };

  // ✅ 3️⃣ Reset Password
  const resetPassword = async () => {
    if (!newPassword) {
      setError("Password field is required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/reset-password", { email, newPassword });
      setMessage(response.data);
      setOtpSent(false);
      setOtpVerified(false);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setError("");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="body">
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <div className="button-group">
  <button onClick={sendOtp}>Send OTP</button>
  <button>
    <a href="/login" className="header-button">Back To Login</a>
  </button>
</div>

        </>
      ) : !otpVerified ? (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
         
        </>
      )}
    </div></div>
  );
};

export default ForgotPassword;
