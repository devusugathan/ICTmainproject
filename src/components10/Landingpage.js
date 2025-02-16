import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Landingpage.css';
import Cookies from "js-cookie";

const Landingpage = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false); // State to manage whether the user is a guest

  useEffect(() => {
    // Initialize AOS (animations) after component mounts
    AOS.init({ duration: 1000 });

    // Check if the user is logged in using sessionStorage and cookies
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    if (loggedInEmail && userRole) {
      // Redirect based on user role
      if (userRole === "Admin") {
        navigate("/admindashboard", { replace: true });
      } else if (userRole === "User") {
        navigate("/userdashboard", { replace: true });
      } else if (userRole === "Staff") {
        navigate("/staffdashboard", { replace: true });
      }
    } else {
      // Set the user as a guest if no session or cookies exist
      setIsGuest(true);
    }
  }, [navigate]);

  // Render only if the user is a guest
  if (!isGuest) {
    return null; // Optionally, show a loader or fallback UI while checking
  }

  return (
    <div className="App">
      <header className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
       
        <img src="/logo88.png" alt="GreenBoard Logo" style={{ height: '55px', width: 'auto' }} />

         
          <nav className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <a className="btn-getstarted" href="/login">Get Started</a>
        </div>
      </header>

      <main>
        <section id="hero" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="hero d-flex align-items-center">
          <div className="container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="row gy-4" data-aos="fade-up">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 className="hero-title">GreenBoard: Connecting Communities to Sustainable Tech Recycling</h1>
                <p className="hero-text">
                  GreenBoard makes it easy for households to recycle electronics responsibly. Join us in making a sustainable future possible.
                </p>
                <div className="d-flex">
                  <a href="/login" className="btn-getstarted">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 hero-img" data-aos="zoom-in" data-aos-delay="100">
                <img src="/e3.jpg" className="img-fluid hero-image" alt="E-Waste Recycling" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} data-aos="fade-up">
          <div className="container">
            <h2>About GreenBoard</h2>
            <p>
              GreenBoard is a community platform for sustainable e-waste collection. We connect users to eco-friendly electronic waste disposal services, ensuring responsible recycling that benefits the planet and the community.
            </p>
          </div>
        </section>

        <section id="services" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="services section" data-aos="fade-up">
          <div className="container">
            <h2>Our Services</h2>
            <div className="row">
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                <div className="service-card">
                  <h4 style={{ color: 'rgba(6, 126, 48, 0.8)' }}>Convenient Pickups</h4>
                  <p>Schedule a pickup at your convenience, from any location.</p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div className="service-card ">
                  <h4 style={{ color: 'rgba(6, 126, 48, 0.8)' }}>Eco-Friendly Disposal</h4>
                  <p>We ensure all e-waste is recycled responsibly, reducing landfill impact.</p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                <div className="service-card">
                  <h4 style={{ color: 'rgba(6, 126, 48, 0.8)' }}>Community Impact</h4>
                  <p>Your recycling efforts contribute to a sustainable future.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="testimonials section" data-aos="fade-up">
          <div className="container">
            <h2>What Our Customers Say</h2>
            <div className="row">
              <div className="col-md-4" data-aos="fade-right">
                <div className="testimonial-item">
                  <img src="/t1.jpg" alt="Sarah L." className="testimonial-img" />
                  <blockquote>
                    "GreenBoard made recycling my old electronics so easy! Their pickup service is a game changer."
                    <footer style={{ backgroundColor: 'rgba(37, 152, 77, 0.8)', color: 'white' }}>- Sarah L., Happy Customer</footer>
                  </blockquote>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up">
                <div className="testimonial-item">
                  <img src="/t2.jpg" alt="James P." className="testimonial-img" />
                  <blockquote>
                    "I love how simple and eco-friendly GreenBoard's services are. Highly recommend!"
                    <footer style={{ backgroundColor: 'rgba(37, 152, 77, 0.8)', color: 'white' }}>- James P., Environmental Enthusiast</footer>
                  </blockquote>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-left">
                <div className="testimonial-item">
                  <img src="/t3.jpg" alt="Alex R." className="testimonial-img" />
                  <blockquote>
                    "Using GreenBoard has made recycling my tech so simple, and I feel good about helping the environment."
                    <footer style={{ backgroundColor: 'rgba(37, 152, 77, 0.8)', color: 'white' }}>- Alex R., Satisfied Customer</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} data-aos="fade-up">
          <div className="container">
            <h2>Contact Us</h2>
            <div className="row">
              <div className="col-md-4">
                <h4>Our Location</h4>
                <p>123 Green Street, Sustainable City</p>
              </div>
              <div className="col-md-4">
                <h4>Email Us</h4>
                <p>contact@greenboard.com</p>
              </div>
              <div className="col-md-4">
                <h4>Call Us</h4>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container1">
          <p>&copy; {new Date().getFullYear()} GreenBoard. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Landingpage;
