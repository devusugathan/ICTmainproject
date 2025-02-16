import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Userrequest.css";
import Userheader from "./Userheader";
import { useNavigate } from "react-router-dom";
function Userrequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reqCityName: "",
    reqHouseName: "",
    reqDistrict: "",
    reqLandmark: "",
    reqContactNum: "",
    reqCategory: [],
    reqSugDate1: "",
    reqSugDate2: "",
    reqUsrId: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    if (!loggedInEmail || userRole !== "User") {
      navigate("/", { replace: true });
      return;
    }

    axios.get("http://localhost:8080/api/data")
      .then((res) => {
        const user = res.data.find((user) => user.emailId === loggedInEmail);
        if (user) {
          setFormData((prev) => ({ ...prev, reqUsrId: user.id }));
          fetchUserRequests(user.id);
        } else {
          setError("User not found.");
        }
      })
      .catch(() => setError("Failed to load user information."));

    axios.get("http://localhost:8080/api/category")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories."));
  }, [navigate]);

  const fetchUserRequests = (userId) => {
    axios.get("http://localhost:8080/api/collectionrequest")
      .then((res) => {
        const filteredRequests = res.data.filter((req) => req.reqUserId === userId);
        setUserRequests(filteredRequests);
      })
      .catch(() => setError("Failed to load collection requests."));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, reqCategory: [category] }));
  };

  const validateForm = () => {
    const { reqCategory, reqCityName, reqHouseName, reqDistrict, reqLandmark, reqContactNum, reqSugDate1, reqSugDate2 } = formData;
    if (!reqCategory.length || !reqCityName.length || !reqHouseName.length || !reqDistrict.length || !reqLandmark.length || !reqContactNum.length || !reqSugDate1 || !reqSugDate2) {
      setError("Please fill out all fields.");
      return false;
    }
 // Check if contact number is exactly 10 digits
 if (!/^\d{10}$/.test(reqContactNum)) {
  setError("Contact number must be exactly 10 digits.");
  return;
}
    if (reqSugDate1 === reqSugDate2) {
      setError("Suggested dates must be different.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setError("");
    if (!validateForm()) return;

    const { reqCityName, reqContactNum, reqDistrict, reqHouseName, reqLandmark, reqCategory, reqSugDate1, reqSugDate2, reqUsrId } = formData;
    const requestData = {
      district: reqDistrict,
      contactNum: reqContactNum,
      landmark: reqLandmark,
      houseName: reqHouseName,
      cityName: reqCityName,
      category: reqCategory[0],
      sugDate1: reqSugDate1,
      sugDate2: reqSugDate2,
      reqUserId: reqUsrId,
    };

    setIsLoading(true);
    axios.post("http://localhost:8080/api/addcollectionrequest", requestData)
      .then(() => {
        alert("Your request has been successfully added!");
        resetForm();
        fetchUserRequests(reqUsrId);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to add request."))
      .finally(() => setIsLoading(false));
  };

  const resetForm = () => {
    setFormData({ reqDistrict: "", reqLandmark: "", reqCityName: "", reqContactNum: "", reqHouseName: "", reqCategory: [], reqSugDate1: "", reqSugDate2: "", reqUsrId: formData.reqUsrId });
    setShowForm(false);
  };

  return (
    <div>

   
    <div  style={{
      backgroundImage: `url('rr11.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
    }}>
      <Userheader />
      
      <div className="container3" >

        <center>
          <div className="tablediv">
            <table border="1" width="80%">
              <thead>
                <tr>
                  <th>District</th>
                  <th>City</th>
                  <th>Landmark</th>
                  <th>House Name</th>
                  <th>Contact</th>
                  <th>Category</th>
                  <th>Date 1</th>
                  <th>Date 2</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.length > 0 ? (
                  userRequests.map((req) => (
                    <tr key={req.requestId}>
                      <td>{req.district}</td>
                      <td>{req.cityName}</td>
                      <td>{req.landmark}</td>
                      <td>{req.houseName}</td>
                      <td>{req.contactNum}</td>
                      
                      <td>{req.category}</td>
                      <td>{req.sugDate1}</td>
                      <td>{req.sugDate2}</td>
                      <td>{req.reqStatus}</td>
                      <td>{req.statusDes}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7">No requests found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <button class="new-request-btn" onClick={() => setShowForm(true)} style={{ marginTop: "20px" }}>New Request</button>
          
          {showForm && (
            <div id="form" style={{ marginTop: "20px" }}>
              <h2>Register</h2>
              <form>
                <div className="form-group">
                  <label>District:</label>
                  <input type="text" value={formData.reqDistrict} onChange={(e) => handleChange("reqDistrict", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input type="text" value={formData.reqCityName} onChange={(e) => handleChange("reqCityName", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Landmark:</label>
                  <input type="text" value={formData.reqLandmark} onChange={(e) => handleChange("reqLandmark", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>House Name:</label>
                  <input type="text" value={formData.reqHouseName} onChange={(e) => handleChange("reqHouseName", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Contact Num:</label>
                  <input type="number" value={formData.reqContactNum} onChange={(e) => handleChange("reqContactNum", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select value={formData.reqCategory[0]} onChange={(e) => handleCategoryChange(e.target.value)} required>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Suggest Date (option 1):</label>
                  <input type="date" value={formData.reqSugDate1} onChange={(e) => handleChange("reqSugDate1", e.target.value)} min={today} required />
                </div>
                <div className="form-group">
                  <label>Suggest Date (option 2):</label>
                  <input
                    type="date"
                    value={formData.reqSugDate2}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      if (selectedDate === formData.reqSugDate1) {
                        setError("Suggested Date 2 must be different from Date 1.");
                        return;
                      }
                      handleChange("reqSugDate2", selectedDate);
                    }}
                    min={today}
                    required
                  />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <div style={{ display: "flex", justifyContent: "space-between", width: "70%", gap: "20px" }}>
  <button type="button" onClick={handleSubmit} disabled={isLoading}>
    {isLoading ? "Submitting..." : "Request"}
  </button>
  <button type="button" onClick={resetForm} style={{ marginLeft: "20px" }}>Cancel</button>
</div>


              </form>
            </div>
          )}
        </center>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="animate-fadeIn">&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
      </div>
    
      
    </div>

  );
}

export default Userrequest;