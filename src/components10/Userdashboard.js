import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Userheader from './Userheader';
import './Userdashboard.css';

const Userdashboard = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [userStats, setUserStats] = useState({
    totalRecycled: '2,543',
    activeUsers: '1,234',
    collectionPoints: '89'
  });

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");

    if (!loggedInEmail || userRole !== "User") {
      navigate("/", { replace: true });
    }
    setIsVisible(true);
    
    // Simulate fetching user stats
    setTimeout(() => {
      animateCount(2543, setTotalRecycled);
      animateCount(1234, setActiveUsers);
      animateCount(89, setCollectionPoints);
    }, 1000);
  }, [navigate]);

  const animateCount = (target, setter) => {
    let count = 0;
    const increment = target / 100; // Adjust speed of counting
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      setter(Math.floor(count));
    }, 20);
  };

  const setTotalRecycled = (value) => {
    setUserStats((prev) => ({ ...prev, totalRecycled: value }));
  };

  const setActiveUsers = (value) => {
    setUserStats((prev) => ({ ...prev, activeUsers: value }));
  };

  const setCollectionPoints = (value) => {
    setUserStats((prev) => ({ ...prev, collectionPoints: value }));
  };

  const stats = [
    { 
      title: "Total Recycled", 
      value: `${userStats.totalRecycled} kg`,
      color: "bg-blue-500"
    },
    { 
      title: "Active Users", 
      value: userStats.activeUsers,
      color: "bg-green-500"
    },
    { 
      title: "Collection Points", 
      value: userStats.collectionPoints,
      color: "bg-purple-500"
    }
  ];
  const awarenessMessages = [
    {
      text: "Did you know? Every year, approximately 50 million tons of e-waste is generated worldwide.",
      tip: "Start recycling today!"
    },
    {
      text: "E-waste contains toxic materials like lead, mercury, and cadmium that can harm our environment.",
      tip: "Proper disposal is crucial"
    },
    {
      text: "Proper e-waste recycling can recover valuable materials like gold, silver, and copper.",
      tip: "Support recycling initiatives"
    },
    {
      text: "One recycled cell phone saves enough energy to power a laptop for 44 hours!",
      tip: "Small actions matter"
    }
  ];

  const disposalTips = [
    {
      title: "Proper Disposal",
      text: "Never throw e-waste in regular trash bins - it's harmful to the environment"
    },
    {
      title: "Battery Handling",
      text: "Remove batteries before disposing of electronic devices"
    },
    {
      title: "Authorized Centers",
      text: "Use authorized e-waste collection centers for safe disposal"
    },
    {
      title: "Donation",
      text: "Consider donating working electronics to extend their lifecycle"
    }
  ];

  const teamMembers = [
    { image: 'r13', name: 'Milania Doe' },
    { image: 'r14', name: 'Jane Smith' },
    { image: 'r15', name: 'Mike Johnson' },
    { image: 'r17', name: 'Sarah Wilson'}
  ];

  return (
    <div className={`min-h-screen ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Userheader />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-pattern animate-slide"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Welcome to GreenBoard</h1>
          <p className="text-xl animate-fadeInUp animation-delay-200">Together, let's make e-waste management sustainable</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`stat-card ${stat.color} animate-fadeIn`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
      <br></br>
        <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Our Clients</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="team-member animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={`/${member.image}.jpg`} 
                alt={member.name}
                className="team-member-image"
              />
              <div className="team-member-overlay">
                <div className="text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awareness Messages */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
        <br></br>
          <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">E-Waste Awareness</h2>
          <div className="awareness-grid">
            {awarenessMessages.map((message, index) => (
              <div 
                key={index} 
                className="awareness-card animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <p className="text-lg text-gray-800">{message.text}</p>
                  <p className="text-green-600 mt-2 font-medium">{message.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disposal Tips */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
        <br></br>
          <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Proper E-Waste Disposal</h2>
          <div className="disposal-grid">
            {disposalTips.map((tip, index) => (
              <div 
                key={index} 
                className="disposal-card animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="disposal-gradient animate-gradient"></div>
                <div className="disposal-content">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                    <p className="text-gray-700">{tip.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

   

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="animate-fadeIn">&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
    </div>
  );
};

export default Userdashboard;