import React, { useEffect, useState } from 'react';
import Staffheader from './Staffheader';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './Staffdashboard.css';

function Staffdashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [staffStats, setStaffStats] = useState({
    totalReports: '1284',
    activeStaff: '568',
    completedTasks: '1275'
  });

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem('loggedInEmail') || Cookies.get('loggedInEmail');
    const userRole = sessionStorage.getItem('userRole') || Cookies.get('userRole');

    if (!loggedInEmail || userRole !== 'Staff') {
      console.log('Redirecting to landing page...');
      navigate('/', { replace: true });
    } else {
      setIsVisible(true);
    }

    // Simulate fetching staff stats
    setTimeout(() => {
      animateCount(1284, setTotalReports);
      animateCount(568, setActiveStaff);
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
    setStaffStats((prev) => ({ ...prev, totalReports: value }));
  };

  const setActiveStaff = (value) => {
    setStaffStats((prev) => ({ ...prev, activeStaff: value }));
  };

  const setCompletedTasks = (value) => {
    setStaffStats((prev) => ({ ...prev, completedTasks: value }));
  };

  const stats = [
    {
      title: 'Total Reports',
      value: staffStats.totalReports,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Staff',
      value: staffStats.activeStaff,
      color: 'bg-green-500'
    },
    {
      title: 'Completed Tasks',
      value: staffStats.completedTasks,
      color: 'bg-purple-500'
    }
  ];

  const awarenessMessages = [
    {
      text: 'Efficient reporting is key to streamlining operations.',
      tip: 'Update statuses regularly'
    },
    {
      text: 'Keep an eye on incoming reports for timely responses.',
      tip: 'Review reports in real time'
    }
  ];

  const disposalTips = [
    {
      title: 'Report Maintenance',
      text: 'Ensure all reports are kept up to date with accurate details.'
    },
    {
      title: 'Task Completion',
      text: 'Review tasks to ensure timely completion of all assigned work.'
    }
  ];

  const teamMembers = [
    { image: 'r2' },
    { image: 'r3' },
    { image: 'r4'},
    { image: 'r5'}
  ];

  return (
    <div className={`min-h-screen ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Staffheader />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-pattern animate-slide"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Welcome to Staff Dashboard</h1>
          <p className="text-xl animate-fadeInUp animation-delay-200">
            Together, let's streamline our operations for better efficiency
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
        <br></br>
        <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Our Team</h2>
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
        <br></br>
          <h2 className="text-4xl font-bold text-center mb-12 animate-fadeInUp">Staff Tips</h2>
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
          <p className="animate-fadeIn">&copy; 2025 Staff Portal. Streamlining our efforts for success.</p>
        </div>
      </footer>
    </div>
  );
}

export default Staffdashboard;
