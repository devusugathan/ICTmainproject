import React from 'react';
import './Header.css'; // Custom CSS for Header styling

function Header() {
  return (
    <header className="header">
     
        <img src="/logo88.png" alt="GreenBoard Logo" style={{ height: '55px', width: 'auto' }} />

      <div className="header-buttons">
        <a href="/logout" className="header-button">Logout</a>
        <a href="/checkrequest" className="header-button">Request</a>
        <a href="/categories" className="header-button">Categories</a>
        <a href="/collection" className="header-button">Collection</a>
        
        <a href="/addstaff" className="header-button">Staff</a>
        <a href="/adminprofile" className="header-button">Profile</a>
      </div>
    </header>
  );
}

export default Header;
