import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Userprofile.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [usrFirstName, setFirstName] = useState("");
  const [usrLastName, setLastName] = useState("");
  const [usrHouseName, setHouseName] = useState("");
  const [usrCityName, setCityName] = useState("");
  const [usrDistrictName, setDistrictName] = useState("");
  const [usrContactNum, setContactNum] = useState("");
  const [usrEmailId, setEmailId] = useState("");
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    if (!loggedInEmail || userRole !== "Admin") {
      navigate("/", { replace: true });
      return;
    }

    if (loggedInEmail) {
      axios
        .get("http://localhost:8080/api/data/email", { params: { email: loggedInEmail } })
        .then((res) => {
          const { password, id, roleName, ...safeData } = res.data;
          setUserId(id);
          setFirstName(safeData.firstName || "");
          setLastName(safeData.lastName || "");
          setHouseName(safeData.houseName || "");
          setCityName(safeData.cityName || "");
          setDistrictName(safeData.districtName || "");
          setContactNum(safeData.contactNum || "");
          setEmailId(safeData.emailId || "");
          setIsLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch user data");
          setIsLoading(false);
        });
    }
  }, [navigate]); // Added 'navigate' to the dependency array



  const updateUser = async () => {
    if (!validateForm()) return;

    const updatedData = {
      firstName: usrFirstName,
      lastName: usrLastName,
      houseName: usrHouseName,
      cityName: usrCityName,
      districtName: usrDistrictName,
      contactNum: usrContactNum,
      emailId: usrEmailId,
    };

    try {
      await axios.put(`http://localhost:8080/api/updatedata/${userId}`, updatedData);
      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);
      setError("");
    } catch (error) {
      setError("Failed to update profile. Please check your input.");
    }
  };

  const validateForm = () => {
    if (!usrFirstName || !usrLastName || !usrHouseName || !usrCityName || !usrDistrictName || !usrContactNum || !usrEmailId) {
      setError("All fields are required");
      return false;
    }
    if (!/\d{10}$/.test(usrContactNum)) {
      setError("Contact number must be 10 digits");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usrEmailId)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <div className="card-header">
            <h2 className="card-title">Admin Profile</h2>
            {!isEditing && (
              <button className="button button-primary" onClick={() => setIsEditing(true)}>
                <span className="button-icon">✏️</span> Edit Profile
              </button>
            )}
          </div>

          <div className="card-content">
            {successMessage && <div className="message message-success">{successMessage}</div>}
            {isLoading ? (
              <div className="skeleton-grid">{[...Array(7)].map((_, i) => <div key={i} className="skeleton skeleton-field" />)}</div>
            ) : isEditing ? (
              <div className="form-container4">
                <div className="form-grid">
                  {[
                    { key: "usrFirstName", label: "First Name", state: usrFirstName, setState: setFirstName },
                    { key: "usrLastName", label: "Last Name", state: usrLastName, setState: setLastName },
                    { key: "usrHouseName", label: "House Name", state: usrHouseName, setState: setHouseName },
                    { key: "usrCityName", label: "City Name", state: usrCityName, setState: setCityName },
                    { key: "usrDistrictName", label: "District Name", state: usrDistrictName, setState: setDistrictName },
                    { key: "usrContactNum", label: "Contact Number", state: usrContactNum, setState: setContactNum, type: "number" },
                  ].map(({ key, label, state, setState, type }) => (
                    <div key={key} className="form-field">
                      <label>{label}:</label>
                      <input type={type || "text"} value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                  ))}
                </div>

                <div className="button-container4">
                 <button className="button button-primary" style={{ width: "150px" }} onClick={updateUser}>Save Changes</button>
                  <button 
  className="button button-secondary" 
  style={{ width: "150px" }} 
  onClick={() => setIsEditing(false)}
>
  Cancel
</button>

                </div>
                {error && <div className="message message-error">{error}</div>}
              </div>
            ) : (
              <div className="profile-grid">
                {[
                  { label: "First Name", value: usrFirstName, icon: "fas fa-user" },
                  { label: "Last Name", value: usrLastName, icon: "fas fa-user" },
                  { label: "House Name", value: usrHouseName, icon: "fas fa-home" },
                  { label: "City Name", value: usrCityName, icon: "fas fa-city" },
                  { label: "District Name", value: usrDistrictName, icon: "fas fa-map-marker-alt" },
                  { label: "Contact Number", value: usrContactNum, icon: "fas fa-phone-alt" },
                  { label: "Email", value: usrEmailId, icon: "fas fa-envelope" },
                ].map(({ label, value, icon }, index) => (
                  <div key={index} className="profile-field">
                    <i className={icon} style={{ marginRight: '8px' }}></i>
                    <strong>{label}:</strong> {value || "Not set"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="animate-fadeIn">&copy; 2025 Staff Portal. Streamlining our efforts for success.</p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default AdminProfile;
