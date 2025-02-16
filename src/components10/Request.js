import React, { useEffect, useState } from 'react';
import Header from './Header';
import { motion } from 'framer-motion';
import './Request.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Request = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
const [error, setError] = useState("");
  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
  
    // Redirect if no logged-in user or incorrect role
    if (!loggedInEmail || userRole !== "Admin") {
      navigate("/", { replace: true });
      return;
    }
  
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/collectionrequest");
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          alert("Failed to load requests.");
        }
      } catch (error) {
        alert("Error fetching requests.");
      }
    };
  
    fetchRequests();
  }, [navigate]); // Added navigate to dependencies
  

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setStatus(request.reqStatus);
    setDescription(request.statusDes);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setSelectedRequest(null);
  };

  const handleSubmit = async () => {
    setError("");
    if (!description)
      {
        setError("Please fill out all fields.");
      return;
    }

    if (!selectedRequest) return;
    const updatedRequest = { ...selectedRequest, reqStatus: status, statusDes: description };
    try {
      const response = await fetch(`http://localhost:8080/api/updatecollectionrequest/${selectedRequest.requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqStatus: status, statusDes: description }),
      });
      if (response.ok) {
        setRequests(requests.map((req) => (req.requestId === selectedRequest.requestId ? updatedRequest : req)));
        setFormVisible(false);
        setSelectedRequest(null);
        alert('Request updated successfully!');
      } else {
        alert('Failed to update request.');
      }
    } catch (error) {
      alert('Error updating request.');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const filteredRequests = requests.filter(request => request.reqStatus === 'Requested');
  const rejectedRequests = requests.filter(request => request.reqStatus === 'Rejected');

  return (
    <div> <Header />
    <div className="request-container">
     
      <video autoPlay muted loop className="background-video">
        <source src="/vd3.mp4" type="video/mp4" />
      </video>
      <div className="content">
    
        
      <motion.table 
  className="styled-table" 
  style={{ marginLeft: "-27px" }} // Adjust the value as needed
>

          <thead>
            <tr>
              <th>District</th>
              <th>City</th>
              <th>Landmark</th>
              <th>House</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Date 1</th>
              <th>Date 2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <motion.tr key={request.requestId} className="table-row">
                <td>{request.district}</td>
                <td>{request.cityName}</td>
                <td>{request.landmark}</td>
                <td>{request.houseName}</td>
                <td>{request.contactNum}</td>
                <td>{request.category}</td>
                <td>{request.reqStatus}</td>
                <td>{request.statusDes}</td>
                <td>{formatDate(request.sugDate1)}</td>
                <td>{formatDate(request.sugDate2)}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(request)}>Edit</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
        {formVisible && (
          <div className="form-container">
            <h2>Edit Request</h2>
            <form>
              <label>Request Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Requested">Requested</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <label>Status Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        )}
        <button className="toggle-rejected-btn" onClick={() => setShowRejected(!showRejected)}>
          {showRejected ? 'Hide Rejected Requests' : 'Show Rejected Requests'}
        </button>
        <br></br>
        {showRejected && (
          <motion.table className="styled-table">
            <thead>
              <tr>
                <th>District</th>
                <th>City</th>
                <th>Landmark</th>
                <th>House</th>
                <th>Contact</th>
                <th>Category</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {rejectedRequests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.district}</td>
                  <td>{request.cityName}</td>
                  <td>{request.landmark}</td>
                  <td>{request.houseName}</td>
                  <td>{request.contactNum}</td>
                  <td>{request.category}</td>
                  <td>{request.reqStatus}</td>
                  <td>{request.statusDes}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
      
    </div>
    <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
      </div>
  );
};
export default Request;
