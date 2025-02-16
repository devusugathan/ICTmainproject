import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addstaff.css";
import Cookies from "js-cookie";
import Header from './Header';
import { useNavigate } from "react-router-dom";
function Addstaff() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usrFirstName, setFirstName] = useState("");
  const [usrLastName, setLastName] = useState("");
  const [usrHouseName, setHouseName] = useState("");
  const [usrCityName, setCityName] = useState("");
  const [usrDistrictName, setDistrictName] = useState("");
  const [usrContactNum, setContactNum] = useState("");
  const [usrEmailId, setEmailId] = useState("");
  const [usrLoginPassword, setLoginPassword] = useState("");
  const [usrCPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
   

  
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
  
    // Redirect if no logged-in user or incorrect role
    if (!loggedInEmail || userRole !== "Admin") {
      navigate("/", { replace: true });
      return;
    }
  
    fetchStaffs();
  }, [navigate]); // Added navigate as a dependency
  

  const fetchStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/data");
      const filteredStaffs = response.data.filter((staff) => staff.roleName === "Staff");
      setStaffs(filteredStaffs);
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{10,}$/;
    return regex.test(password);
  }

  async function addUser() {
    setError("");

    const usrRoleName = "Staff";

    if (!usrFirstName || !usrLastName || !usrCityName || !usrHouseName || !usrDistrictName || !usrContactNum || !usrEmailId || !usrLoginPassword || !usrCPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (!/^[\d]{10}$/.test(usrContactNum)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    if (!isValidEmail(usrEmailId)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!isValidPassword(usrLoginPassword)) {
      setError("Password must be at least 10 characters long and contain at least one number, one letter, and one special character.");
      return;
    }

    if (usrLoginPassword !== usrCPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      firstName: usrFirstName,
      lastName: usrLastName,
      emailId: usrEmailId,
      loginPassword: usrLoginPassword,
      roleName: usrRoleName,
      districtName: usrDistrictName,
      cityName: usrCityName,
      houseName: usrHouseName,
      contactNum: usrContactNum,
    };

    try {
      // Create staff in the database
      const res = await axios.post("http://localhost:8080/api/adddata", userData);
      const newUser = res.data;

      // Create staff duty info in the database
      const dutyData = { staffId: newUser.id };
      await axios.post("http://localhost:8080/api/addstaffduty", dutyData);

      setUsers([...users, newUser]);
      setError("The staff has been added successfully.");
      fetchStaffs();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      const serverError = error.response?.data?.message || "Failed to register staff. Please try again later.";
      setError(serverError);
    }
  }

  function cancelForm() {
    resetForm();
    setShowForm(false);
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setCityName("");
    setDistrictName("");
    setHouseName("");
    setContactNum("");
    setEmailId("");
    setLoginPassword("");
    setCPassword("");
    setError("");
  }

  const handleRemoveStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletedata/${id}`);
      fetchStaffs();
    } catch (error) {
      console.error("Error removing staff:", error);
    }
  };

  return (
    <div>
      <Header />
       
        {/* Background Video */}
        <div className="video-container">
          <video autoPlay loop muted>
            <source src="/vd6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
<br></br>

<button
  className="add-staff-btn"
  style={{ padding: "6px 12px", fontSize: "14px", width: "150px", height: "35px" }}
  onClick={() => setShowForm(true)}
>
  Add New Staff
</button>

      {showForm && (
        <div id="form" style={{ width: "50%", textAlign: "left" }}>
      

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
              <button type="button" onClick={addUser}>Add</button>
              <button type="button" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="container3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email ID</th>
              <th>Contact</th>
              <th>House</th>
              <th>City</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.firstName}</td>
                <td>{staff.lastName}</td>
                <td>{staff.emailId}</td>
                <td>{staff.contactNum}</td>
                <td>{staff.houseName}</td>
                <td>{staff.cityName}</td>
                <td>{staff.districtName}</td>
                <td>
                  <button
                    onClick={() => handleRemoveStaff(staff.id)}
                    className="remove-btn"
                    style={{ width: '100px' }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Footer - Sticks to Bottom */}
       <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
    </div>
  );
}

export default Addstaff;
