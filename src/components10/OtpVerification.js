import React, { useState } from "react";
import axios from "axios";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/verify-otp", { email, otp });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h3>Enter OTP</h3>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpVerification;
