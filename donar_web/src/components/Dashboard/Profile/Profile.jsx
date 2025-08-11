import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Phone, Mail, Calendar, User, Edit3, MessageCircle } from 'lucide-react';
import './Profile.css';

function Profile() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pulseCount, setPulseCount] = useState(0);

  const donor = {
    fullName: "Donar 1",
  profilePicture: "https://ui-avatars.com/api/?name=D&background=8e24aa&color=ffffff&size=128&rounded=true",
    bloodGroup: "O+",
    dob: "15-05-1990",
    age: 34,
    gender: "Male",
    email: "donar1@gmail.com.",
    phone: "8245720326",
    address: "129/87,Bharathi Street,Nungambakkam,Chennai",
    locationLink: "https://maps.google.com/?q=129/87,Bharathi Street,Nungambakkam,Chennai",
    lastDonation: "2024-06-15",
    donations: 4,
    availability: "Available"
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const pulseInterval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="profile-page">
      {/* Dynamic Background Elements */}
      <div className="background-container">
        {/* Animated gradient orbs */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        
        {/* Floating drops */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-drop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="drop-icon">🩸</div>
          </div>
        ))}
        
        {/* Animated dots pattern */}
        <div 
          className="dots-pattern"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div 
          className="profile-card-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Profile Card */}
          <div className="profile-card">
            {/* Header Section */}
            <div className="profile-header">
              <div className="header-overlay"></div>
              <div className="header-content">
                <div className="profile-info-section">
                  <div className="profile-picture-container">
                    <img
                      src={donor.profilePicture}
                      alt={donor.fullName}
                      className="profile-picture"
                    />
                    <div className="status-indicator">
                      <div className="status-dot"></div>
                    </div>
                  </div>
                  <div className="profile-details">
                    <div className="name-and-edit">
                      <h1 className="profile-name">{donor.fullName}</h1>
                      <button className="edit-btn">
                        <Edit3 className="edit-icon" />
                      </button>
                    </div>
                    <div className="profile-badges">
                      <div className="blood-group-badge">
                        {donor.bloodGroup}
                      </div>
                      <div className="availability-badge">
                        <div className="availability-dot"></div>
                        <span>{donor.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Bar - Perfect horizontal alignment */}
            <div className="stats-bar">
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-content">
                    <div className="stat-number">
                      <span className="number-text">{donor.donations}</span>
                    </div>
                    <div className="stat-label">Donations</div>
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-content">
                    <div className="stat-number">
                      <span className="number-text">3+</span>
                    </div>
                    <div className="stat-label">Years Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="info-sections">
              {/* Basic Info */}
              <div className="info-section">
                <h3 className="section-title">
                  <User className="section-icon" />
                  Basic Information
                </h3>
                <div className="info-items">
                  <div className="info-item">
                    <span className="info-label">
                      <Calendar className="info-icon" />
                      Date of Birth
                    </span>
                    <span className="info-value">{donor.dob} ({donor.age} years)</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender</span>
                    <span className="info-value">{donor.gender}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="info-section">
                <h3 className="section-title">
                  <Phone className="section-icon" />
                  Contact Information
                </h3>
                <div className="info-items">
                  <div className="info-item clickable">
                    <span className="info-label">
                      <Mail className="info-icon" />
                      Email
                    </span>
                    <span className="info-value">{donor.email}</span>
                  </div>
                  <div className="info-item clickable">
                    <span className="info-label">
                      <Phone className="info-icon" />
                      Phone
                    </span>
                    <span className="info-value">{donor.phone}</span>
                  </div>
                  <div className="info-item address-item">
                    <div className="address-content">
                      <span className="info-label">
                        <MapPin className="info-icon" />
                        Address
                      </span>
                      <div className="address-details">
                        <div className="address-text">{donor.address}</div>
                        <a 
                          href={donor.locationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="map-link"
                        >
                          <MapPin className="map-icon" />
                          View on Map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;