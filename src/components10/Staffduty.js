import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Staffheader from "./Staffheader";
import "./Staffduty.css"; // Import the CSS file
import { FaMapMarkerAlt, FaCity, FaLandmark, FaHome, FaPhone, FaClipboardList, FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Staffduty() {
   const navigate = useNavigate();
  const [staffDutyInfo, setStaffDutyInfo] = useState([]);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [updatedReqStatus, setUpdatedReqStatus] = useState("");
  const [updatedStatusDes, setUpdatedStatusDes] = useState("");

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
  
    // Redirect if no logged-in user or incorrect role
    if (!loggedInEmail || userRole !== "Staff") {
      navigate("/", { replace: true });
      return;
    }
  
    axios
      .get("http://localhost:8080/api/data")
      .then((res) => {
        const user = res.data.find((user) => user.emailId === loggedInEmail);
  
        if (user) {
          axios
            .get("http://localhost:8080/api/staffduty")
            .then((response) => {
              const filteredData = response.data.filter(
                (duty) => String(duty.staffId) === String(user.id)
              );
  
              if (filteredData.length > 0) {
                setStaffDutyInfo([...filteredData]);
              } else {
                setError("No staff duty data found for the logged-in user.");
              }
            })
            .catch(() => setError("Failed to load staff duty information."));
        } else {
          setError("User not found.");
        }
      })
      .catch(() => setError("Failed to load user information."));
  }, [navigate]); // Added navigate as a dependency
  

  const fetchCollectionRequestDetails = (assignedDutyId) => {
    axios
      .get("http://localhost:8080/api/collectionrequest")
      .then((response) => {
        const matchingRequests = response.data.filter(
          (request) => request.requestId === assignedDutyId
        );
        setDetails(matchingRequests.length > 0 ? matchingRequests : []);
      })
      .catch(() => setError("Failed to load collection request details."));
  };

  const handleUpdateClick = (request) => {
    setEditingRequest(request);
    setUpdatedReqStatus(request.reqStatus);
    setUpdatedStatusDes(request.statusDes);
  };

  const handleUpdateSubmit = () => {
    if (!updatedReqStatus || !updatedStatusDes) {
      setError("Both fields are required.");
      return;
    }

    const updatedRequest = {
      ...editingRequest,
      reqStatus: updatedReqStatus,
      statusDes: updatedStatusDes,
    };

    axios
      .put(
        `http://localhost:8080/api/updatecollectionrequest/${editingRequest.requestId}`,
        updatedRequest
      )
      .then(() => {
        if (updatedReqStatus === "Work Completed") {
          const loggedInEmail =
            sessionStorage.getItem("loggedInEmail") ||
            Cookies.get("loggedInEmail");

          axios.get("http://localhost:8080/api/data").then((res) => {
            const user = res.data.find((u) => u.emailId === loggedInEmail);

            if (user) {
              const resetDuty = {
                assignedDutyId: 0,
                dutyStatus: "Nothing Assigned",
                staffId: user.id,
              };

              axios
                .put(
                  `http://localhost:8080/api/updatestaffduty/${user.id}`,
                  resetDuty
                )
                .then(() => {
                  setStaffDutyInfo((prevDuties) =>
                    prevDuties.map((duty) =>
                      duty.staffId === user.id
                        ? {
                            ...duty,
                            assignedDutyId: 0,
                            dutyStatus: "Nothing Assigned",
                          }
                        : duty
                    )
                  );
                })
                .catch(() => setError("Error resetting staff duty."));
            }
          });
        }

        setDetails(null);
        setEditingRequest(null);
        setError("");
      })
      .catch(() => setError("Failed to update collection request."));
  };

  const handleCloseDetails = () => {
    setDetails(null);
  };

  return (
    <div className="staff-container">
      <Staffheader />

      {error && <p className="error-message">{error}</p>}

      <div className="duty-container">
        <div className="duty-left-panel"><center>
          <h2>Welcome to Your Duty Dashboard!</h2>
          <p>
            Your efforts in e-waste collection are making a huge difference in
            creating a sustainable environment. Keep up the great work!
          </p>
          {staffDutyInfo.length > 0 ? (
            staffDutyInfo.map((duty) => (
              <div key={duty.dutyId} className="duty-status">
                <p>Duty Status: {duty.dutyStatus}</p>
                {duty.assignedDutyId !== 0 && (
                  <button
                    className="details-button"
                    onClick={() =>
                      fetchCollectionRequestDetails(duty.assignedDutyId)
                    }
                  >
                    Details
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No duty data available.</p>
          )}
          </center>
        </div>

        {details && (
        <div className="details-right-panel">
        <center>
          <h2>Collection Request Details 📋</h2>
          {details.length > 0 ? (
            details.map((request) => (
              <div key={request.requestId} className="request-details">
                <div className="details-grid">
                  {/* Row 1 */}
                  <p><FaClipboardList className="icon" /> <strong>Request ID:</strong> {request.requestId}</p>
                  <p><FaMapMarkerAlt className="icon" /> <strong>District:</strong> {request.district}</p>
      
                  {/* Row 2 */}
                  <p><FaCity className="icon" /> <strong>City:</strong> {request.cityName}</p>
                  <p><FaLandmark className="icon" /> <strong>Landmark:</strong> {request.landmark}</p>
      
                  {/* Row 3 */}
                  <p><FaHome className="icon" /> <strong>House Name:</strong> {request.houseName}</p>
                  <p><FaPhone className="icon" /> <strong>Contact:</strong> {request.contactNum}</p>
                  <p><FaClipboardList className="icon" /> <strong>Category:</strong> {request.category}</p>
                  <p><FaRegCheckCircle className="icon" /> <strong>Status:</strong> {request.reqStatus}</p>
                  
                 </div>
      
                 <p><FaInfoCircle className="icon" /> <strong>Description:</strong> {request.statusDes}</p>
                <br></br>
                
                 <div style={{ display: "flex", justifyContent: "space-between", width: "50%", gap: "20px" }}>
  <button className="update-button" onClick={() => handleUpdateClick(request)}>
    ✏️ Update
  </button>
  <button className="close-button" onClick={handleCloseDetails} style={{ marginLeft: "20px" }}>
    ❌ Close
  </button>
</div>

              </div>
            ))
          ) : (
            <p>No matching collection request found.</p>
          )}
        </center>
      </div>
      
       
       
        )}
      </div>

      {editingRequest && (
       <div className="update-form-overlay">
       <div className="update-form">
         <h3 className="form-title">Update Request</h3>
         <form className="update-request-form">
           <label htmlFor="status" className="form-label">
             Request Status
           </label>
           <select
             id="status"
             value={updatedReqStatus}
             onChange={(e) => setUpdatedReqStatus(e.target.value)}
             className="form-input"
           >
             <option value="">Select Status</option>
             <option value="Working">Working</option>
             <option value="Work Completed">Work Completed</option>
             <option value="Not Yet Started">Not Yet Started</option>
           </select>
     
           <label htmlFor="description" className="form-label">
             Status Description
           </label>
           <input
             type="text"
             id="description"
             placeholder="Enter status description"
             value={updatedStatusDes}
             onChange={(e) => setUpdatedStatusDes(e.target.value)}
             className="form-input"
           />
     
           <div className="form-actions">
             <button className="submit-button" onClick={handleUpdateSubmit}>
               Submit
             </button>
             <button
               className="cancel-button"
               onClick={() => setEditingRequest(null)}
             >
               Cancel
             </button>
           </div>
         </form>
       </div>
     </div>
     
      )}

      <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="animate-fadeIn">
            &copy; 2025 GreenBoard. Making e-waste management sustainable.
          </p>
        </div>
      </footer>
       {/* Background Video */}
       <video autoPlay loop muted className="background-video">
        <source src="/v13.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Staffduty;