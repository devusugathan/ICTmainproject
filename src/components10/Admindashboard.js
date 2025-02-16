import React, { useEffect, useState } from 'react';
import Header from './Header';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './Admindashboard.css';

function Admindashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [adminStats, setAdminStats] = useState({
    totalReports: '1284',
    activeAdmins: '15',
    completedTasks: '1275'
  });

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem('loggedInEmail') || Cookies.get('loggedInEmail');
    const userRole = sessionStorage.getItem('userRole') || Cookies.get('userRole');

    if (!loggedInEmail || userRole !== 'Admin') {
      console.log('Redirecting to landing page...');
      navigate('/', { replace: true });
    } else {
      setIsVisible(true);
    }

    // Simulate fetching admin stats
    setTimeout(() => {
      animateCount(1284, setTotalReports);
      animateCount(15, setActiveAdmins);
      animateCount(1275, setCompletedTasks);
    }, 1000);
  }, [navigate]);

  const animateCount = (target, setter) => {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      setter(Math.floor(count));
    }, 20);
  };

  const setTotalReports = (value) => {
    setAdminStats((prev) => ({ ...prev, totalReports: value }));
  };

  const setActiveAdmins = (value) => {
    setAdminStats((prev) => ({ ...prev, activeAdmins: value }));
  };

  const setCompletedTasks = (value) => {
    setAdminStats((prev) => ({ ...prev, completedTasks: value }));
  };

  const stats = [
    {
      title: 'Total Reports',
      value: adminStats.totalReports,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Admins',
      value: adminStats.activeAdmins,
      color: 'bg-green-500'
    },
    {
      title: 'Completed Tasks',
      value: adminStats.completedTasks,
      color: 'bg-purple-500'
    }
  ];

  const awarenessMessages = [
    {
      text: 'Efficient management is key to streamline workflows.',
      tip: 'Delegate tasks properly'
    },
    {
      text: 'Stay on top of incoming reports for better oversight.',
      tip: 'Review reports promptly'
    }
  ];

  const disposalTips = [
    {
      title: 'Report Handling',
      text: 'Make sure all reports are reviewed and updated timely.'
    },
    {
      title: 'Task Monitoring',
      text: 'Keep track of task completion and ensure deadlines are met.'
    }
  ];

  const teamMembers = [
    { image: 'r16' },
    { image: 'e2' },
    { image: 'r9' },
    { image: 'e1' }
  ];

  return (
    <div><Header/>
    <div className={`min-h-screen ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-pattern animate-slide"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Welcome to Admin Dashboard</h1>
          <p className="text-xl animate-fadeInUp animation-delay-200">
            Together, we will manage and monitor operations effectively.
          </p>
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
        <br />
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={`/${member.image}.jpg`}
                alt={`Team Member ${index + 1}`}
                className="team-member-image"
              />
              
            </div>
          ))}
        </div>
      </div>

      {/* Awareness Messages */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <br />
          <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Awareness</h2>
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
          <br />
          <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Admin Tips</h2>
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
          <p className="animate-fadeIn">&copy; 2025 Admin Portal. Empowering our administration efforts for success.</p>
        </div>
      </footer>
    </div></div>
  );
}

export default Admindashboard;
