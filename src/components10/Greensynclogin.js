import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Greensynclogin.css";

function Greensynclogin() {
  const [usrEmail, setEmailId] = useState("");
  const [usrPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    if (loggedInEmail && userRole) {
      console.log("Logged in details from session and cookies:");
      console.log("Email:", loggedInEmail);
      console.log("Role:", userRole);

      if (userRole === "Admin") {
        navigate("/admindashboard", { replace: true });
      } else if (userRole === "User") {
        navigate("/userdashboard", { replace: true });
      } else {
        navigate("/staffdashboard", { replace: true });
      }
    }
  }, [navigate]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLogin = () => {
    setLoginStatus("");

    if (!usrEmail || !usrPassword) {
      setLoginStatus("Please fill out both fields.");
      return;
    }

    if (!isValidEmail(usrEmail)) {
      setLoginStatus("Invalid email format. Please enter a valid email.");
      return;
    }

    axios
      .post("http://localhost:8080/api/authenticate", {
        email: usrEmail,
        password: usrPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          setLoginStatus("Login successful!");

          // Store email and role in sessionStorage and cookies
          sessionStorage.setItem("loggedInEmail", usrEmail);
          sessionStorage.setItem("userRole", user.roleName);
          Cookies.set("loggedInEmail", usrEmail, { expires: 1 });
          Cookies.set("userRole", user.roleName, { expires: 1 });

          console.log("Logged in details:");
          console.log("Email:", usrEmail);
          console.log("Role:", user.roleName);

          if (user.roleName === "Admin") {
            navigate("/admindashboard", { replace: true });
          } else if (user.roleName === "User") {
            navigate("/userdashboard", { replace: true });
          } else {
            navigate("/staffdashboard", { replace: true });
          }
        }
      })
      .catch((error) => {
        console.error("There was an error during authentication:", error);

        if (error.response && error.response.status === 401) {
          setLoginStatus("Invalid email or password. Please try again.");
        } else {
          setLoginStatus("An error occurred. Please try again.");
        }
      });
  };

  const handleCancel = () => {
    setEmailId("");
    setLoginPassword("");
    setLoginStatus("");
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="heading">Welcome Back</h2>
        <p className="subHeading">Log in to your account</p>
        <div className="formGroup">
          <label className="label">Email ID :</label>
          <input
            type="text"
            placeholder="Enter your email ID"
            value={usrEmail}
            onChange={(e) => setEmailId(e.target.value)}
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Password :</label>
          <input
            type="password"
            placeholder="Enter password"
            value={usrPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="input"
          />
        </div>
        <div style={{ textAlign: "left", width: "100%" }}>
  <a href="/forgotpassword" className="forgotPasswordLink" style={{ textDecoration: "none", color: "#4caf50", cursor: "pointer" }}>
    Forgot Password?
  </a>
</div>


        <div className="buttonContainer">
        <button style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }} onClick={validateLogin} className="button">
  Log In
</button>

          <button onClick={handleCancel} className="cancelButton">Cancel</button>
        </div>
        <p className="footerText">
          Don’t have an account? <a href="/signup" className="link">Register</a>
        </p>

        {loginStatus && (
          <p className={loginStatus.includes("successful") ? "successMessage" : "errorMessage"}>
            {loginStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Greensynclogin;
