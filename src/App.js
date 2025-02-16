import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Greensynclogin from "./components10/Greensynclogin";  // Update the import to Greensynclogin
import Signup from "./components10/Signup";
import Userdashboard from "./components10/Userdashboard";
import Admindashboard from "./components10/Admindashboard";
import Logout from "./components10/Logout";
import Addstaff from "./components10/Addstaff";
import Categories from "./components10/Categories";
import Userrequest from "./components10/Userrequest";
import Staffdashboard from "./components10/Staffdashboard";
import Staffduty from "./components10/Staffduty";
import Request from "./components10/Request";
import Landingpage from "./components10/Landingpage";
import Userprofile from "./components10/Userprofile";
import Adminprofile from "./components10/Adminprofile";
import Staffprofile from "./components10/Staffprofile";
import Collection from "./components10/Collection";
import Forgotpassword from "./components10/Forgotpassword";
import OtpVerification from"./components10/OtpVerification";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Landingpage />} />  
          <Route path="/login" element={<Greensynclogin />} />  
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/staffdashboard" element={<Staffdashboard/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={<Userrequest />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/checkrequest" element={<Request />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/addstaff" element={<Addstaff />} />
          <Route path="/duty" element={<Staffduty />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/adminprofile" element={<Adminprofile />} />
          <Route path="/staffprofile" element={<Staffprofile />} />
          <Route path="/forgotpassword" element={<Forgotpassword/>} />
        <Route path="/otpverification" element={<OtpVerification/>}/>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
