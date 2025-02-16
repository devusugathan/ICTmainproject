import React from 'react';
import './Header.css'; // Custom CSS for Header styling

function Staffheader() {
  return (
    <header className="header">
        <img src="/logo88.png" alt="GreenBoard Logo" style={{ height: '55px', width: 'auto' }} />
      <div className="header-buttons">
        <a href="/logout" className="header-button">Logout</a>
     
        <a href="/duty" className="header-button">Duty</a>
        
        <a href="/staffprofile" className="header-button">Profile</a>
      </div>
    </header>
  );
}

export default Staffheader;
