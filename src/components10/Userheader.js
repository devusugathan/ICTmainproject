import React from 'react';
import './Header.css'; // Custom CSS for Header styling

function Userheader() {
  return (
    <header className="header">
         <img src="/logo88.png" alt="GreenBoard Logo" style={{ height: '50px', width: 'auto' }} />
      <div className="header-buttons">
        <a href="/logout" className="header-button">Logout</a>
     
        <a href="/request" className="header-button">Request</a>
        <a href="/userprofile" className="header-button">Profile</a>
      </div>
    </header>
  );
}

export default Userheader;
