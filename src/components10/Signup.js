import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [users, setUsers] = useState([]); // Local user data
  const [usrFirstName, setFirstName] = useState("");
  const [usrLastName, setLastName] = useState("");
  const [usrCityName, setCityName] = useState("");
  const [usrDistrictName, setDistrictName] = useState("");
  const [usrHouseName, setHouseName] = useState("");
  const [usrContactNum, setContactNum] = useState("");
  const [usrEmailId, setEmailId] = useState("");
  const [usrLoginPassword, setLoginPassword] = useState("");
  const [usrCPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Password validation with special character check
  function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{10,}$/;
    return regex.test(password);
  }

  // Fetch all users on component mount to check for email uniqueness
  useEffect(() => {
    axios.get("http://localhost:8080/api/data")
      .then((res) => {
        setUsers(res.data); // Set the users data from the backend
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function addUser() {
    setError("");

    // Check if all fields are filled
    if (!usrFirstName || !usrLastName || !usrCityName || !usrHouseName || !usrDistrictName || !usrContactNum || !usrEmailId || !usrLoginPassword || !usrCPassword) {
      setError("Please fill out all fields.");
      return;
    }

    // Check if contact number is exactly 10 digits
    if (!/^\d{10}$/.test(usrContactNum)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    // Check if email is valid
    if (!isValidEmail(usrEmailId)) {
      setError("Please enter a valid email.");
      return;
    }

    // Check if email already exists
    const emailExists = users.some((user) => user.emailId === usrEmailId);
    if (emailExists) {
      setError("This email is already registered.");
      return;
    }

    // Check if password meets the criteria
    if (!isValidPassword(usrLoginPassword)) {
      setError("Password must be at least 10 characters long and contain at least one number, one letter, and one special character.");
      return;
    }

    // Check if password and confirm password match
    if (usrLoginPassword !== usrCPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare the user data (sending plain password)
    const userData = {
      firstName: usrFirstName,
      lastName: usrLastName,
      emailId: usrEmailId,
      loginPassword: usrLoginPassword,
      cityName: usrCityName,
      districtName: usrDistrictName,
      houseName: usrHouseName,
      contactNum: usrContactNum, // Ensure contactNum is an integer
    };
    

    console.log("User data being sent:", userData); // Debugging log

    // Send user data to the backend
    axios
      .post("http://localhost:8080/api/adddata", userData)
      .then((res) => {
        setUsers([...users, res.data]); // Update local users list
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        // Check if the backend returned a specific error message
        const serverError = error.response?.data?.message || "Failed to register user. Please try again later.";
        setError(serverError);
      });
  }

  function cancelForm() {
    resetForm();
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setCityName("");
    setHouseName("");
    setDistrictName("");
    setContactNum("");
    setEmailId("");
    setLoginPassword("");
    setCPassword("");

    setError("");
  }

  return (
    <div className="container2">
      <center>
        <div id="form">
          <h2>Register</h2>

          <form>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={usrFirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={usrLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>House Name:</label>
              <input
                type="text"
                placeholder="Enter your house name"
                value={usrHouseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City Name:</label>
              <input
                type="text"
                placeholder="Enter your city name"
                value={usrCityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>District Name:</label>
              <input
                type="text"
                placeholder="Enter your district name"
                value={usrDistrictName}
                onChange={(e) => setDistrictName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact No:</label>
              <input
                type="number"
                placeholder="Enter your contact num"
                value={usrContactNum}
                onChange={(e) => setContactNum(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email ID:</label>
              <input
                type="text"
                placeholder="Enter your email ID"
                value={usrEmailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter a password"
                value={usrLoginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={usrCPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="form-buttons">
              <button type="button" onClick={addUser}>Register</button>
              <button type="button" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Signup;
