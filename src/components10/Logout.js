import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session or cookies have any values
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    // Print the details before clearing session and cookies
    console.log("Logged out details:");
    console.log("Email:", loggedInEmail);
    console.log("Role:", userRole);

    // Clear sessionStorage and cookies on logout
    sessionStorage.clear();
    Cookies.remove("loggedInEmail");
    Cookies.remove("userRole");

    // Navigate after clearing data (with a slight delay to avoid double logging)
    const timeout = setTimeout(() => {
      navigate("/", { replace: true });  // Redirect to the landing page
    }, 100);  // Delay by 100ms (you can adjust the time if needed)

    // Clean up the timeout if the component unmounts (prevents any unwanted behavior)
    return () => clearTimeout(timeout);
  }, [navigate]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
      <p>You will be redirected to the landing page shortly.</p>
    </div>
  );
};

export default LogoutPage;
