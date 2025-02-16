import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import Header from './Header';
import "./Collection.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Collection = () => {
    const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [staffVisible, setStaffVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');

  const loadAssignedStaffFromStorage = () => {
    const assignedStaff = localStorage.getItem('assignedStaff');
    return assignedStaff ? JSON.parse(assignedStaff) : {};
  };

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
  
    // Redirect if no logged-in user or incorrect role
    if (!loggedInEmail || userRole !== "Admin") {
      navigate("/", { replace: true });
      return;
    }
  
    const fetchData = async () => {
      try {
        const requestsResponse = await axios.get("http://localhost:8080/api/collectionrequest");
        setRequests(requestsResponse.data);
  
        const dutyResponse = await axios.get("http://localhost:8080/api/staffduty");
        const dutyData = dutyResponse.data;
  
        const greensyncInfoResponse = await axios.get("http://localhost:8080/api/data");
        const greensyncData = greensyncInfoResponse.data;
  
        const combinedStaffData = dutyData.map((duty) => {
          const staffInfo = greensyncData.find((staff) => staff.id === duty.staffId);
          return staffInfo ? { ...duty, ...staffInfo } : { ...duty, firstName: "N/A", lastName: "N/A" };
        });
  
        const availableStaff = combinedStaffData.filter((staffMember) => staffMember.assignedDutyId === 0);
        setStaff(availableStaff);
  
        const assignedStaffData = loadAssignedStaffFromStorage();
        if (assignedStaffData) {
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              assignedStaffData[request.requestId] ? { ...request, assignedStaffName: assignedStaffData[request.requestId].name } : request
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data.");
      }
    };
  
    fetchData();
  }, [navigate]); // Added navigate to dependencies
  

  const handleAssignStaffClick = (request) => {
    setSelectedRequest(request);
    setStaffVisible(true);
  };

  const handleAssignStaff = async () => {
    if (!selectedRequest || !selectedStaff) return;

    const staffIdNum = Number(selectedStaff);

    try {
      const dutyResponse = await axios.get('http://localhost:8080/api/staffduty');
      const dutyData = dutyResponse.data;

      const existingStaffDuty = dutyData.find(duty => duty.assignedDutyId === selectedRequest.requestId);
      if (existingStaffDuty) {
        alert('This request is already assigned to a staff member. Resetting the previous assignment.');
        await axios.put(`http://localhost:8080/api/updatestaffduty/${existingStaffDuty.staffId}`, {
          assignedDutyId: 0,
          dutyStatus: "Nothing assigned",
        });
      }

      const response = await axios.put(`http://localhost:8080/api/updatestaffduty/${staffIdNum}`, {
        assignedDutyId: selectedRequest.requestId,
        dutyStatus: "Task assigned",
      });

      if (response.status === 200) {
        alert('Staff assigned successfully!');
        const selectedStaffMember = staff.find(staff => staff.staffId === staffIdNum);
        const staffFullName = `${selectedStaffMember.firstName} ${selectedStaffMember.lastName}`;

        const assignedStaffData = loadAssignedStaffFromStorage();
        const updatedAssignedStaffData = {
          ...assignedStaffData,
          [selectedRequest.requestId]: { name: staffFullName }
        };
        localStorage.setItem('assignedStaff', JSON.stringify(updatedAssignedStaffData));

        setRequests(prevRequests => prevRequests.map(req =>
          req.requestId === selectedRequest.requestId
            ? { ...req, assignedDutyId: selectedRequest.requestId, dutyStatus: "Task assigned", assignedStaffName: staffFullName }
            : req
        ));
      } else {
        alert('Failed to assign staff.');
      }
    } catch (error) {
      alert('Error assigning staff.');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setStaffVisible(false);
    setSelectedRequest(null);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const filteredRequests = requests.filter(request => request.reqStatus !== 'Rejected' && request.reqStatus !== 'Requested');

  return ( 
    <div className="main-container">
      <Header />
     
      {/* Content Wrapper */}
      <div className="content">
        {/* Background Video */}
        <div className="video-container">
          <video autoPlay loop muted>
            <source src="/vd44.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
<br></br>
        {/* Table Section */}
        <div>
          <table>
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
                <th>Staff</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.requestId}>
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
                    <td>{request.assignedStaffName || 'Not Assigned'}</td>
                    <td>
                      <button 
                        onClick={() => handleAssignStaffClick(request)}
                        style={{ width: '80px' }}
                        disabled={request.reqStatus === 'Work Completed'}
                      >
                        Assign Staff
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Assign Staff Form */}
          {staffVisible && (
            <div className="form-container">
              <h2>Assign Staff</h2>
              <select value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                <option value="">Select Staff</option>
                {staff.length > 0 ? staff.map(staffMember => (
                  <option key={staffMember.dutyId} value={staffMember.staffId}>
                    {staffMember.firstName} {staffMember.lastName}
                  </option>
                )) : <option>No staff available</option>}
              </select>
              <div>
                <button onClick={handleCancel} style={{ backgroundColor: '#f44336', color: 'white' }}>Cancel</button>
                <button onClick={handleAssignStaff}>Assign</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Sticks to Bottom */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
    </div>
  );
};

export default Collection;
