import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Droplets, Package, CheckCircle, XCircle } from 'lucide-react';
import './DonationHistory.css';

const donations = [
  {
    date: "07-12-2025",
    location: "City General Hospital",
    bloodGroup: "O+",
    units: 1,
    status: "Completed",
  },
  {
    date: "05-03-2023",
    location: "Red Cross Blood Bank",
    bloodGroup: "O+",
    units: 1,
    status: "Completed",
  },
  {
    date: "18-06-2022",
    location: "Springfield Medical Center",
    bloodGroup: "O+",
    units: 1,
    status: "Completed",
  },
  {
    date: "11-12-2024",
    location: "Greenwood Hospital",
    bloodGroup: "O+",
    units: 1,
    status: "Completed",
  },
];

function DonationHistory() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const formatDate = (dateString) => {
    // Handle DD-MM-YYYY format
    const parts = dateString.split('-');
    if (parts.length === 3) {
      // Convert DD-MM-YYYY to MM-DD-YYYY for proper Date parsing
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const date = new Date(`${month}-${day}-${year}`);
      
      // Check if date is valid
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });
      }
    }
    
    // Fallback for invalid dates
    return 'Invalid Date';
  };

  return (
    <div className="donation-history-page">
      {/* Dynamic Background Elements - Same as Profile */}
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
        <div className="donation-history-wrapper">
          {/* Header Section */}
          <div className="page-header">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">
                  <Droplets className="title-icon" />
                  Donation History
                </h1>
                <p className="page-subtitle">Track all your past blood donations</p>
              </div>
              <div className="summary-stats">
                <div className="summary-item">
                  <div className="summary-number">{donations.length}</div>
                  <div className="summary-label">Total Donations</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">{donations.reduce((sum, d) => sum + d.units, 0)}</div>
                  <div className="summary-label">Total Units</div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation History Card */}
          <div className="history-card">
            <div className="card-header">
              <h2 className="card-title">
                <Calendar className="card-icon" />
                Donation Records
              </h2>
            </div>

            <div className="donation-table-container">
              {/* Desktop Table View */}
              <div className="table-wrapper desktop-table">
                <table className="donation-table">
                  <thead>
                    <tr>
                      <th>
                        <Calendar className="th-icon" />
                        Date
                      </th>
                      <th>
                        <MapPin className="th-icon" />
                        Location
                      </th>
                      <th>
                        <Droplets className="th-icon" />
                        Blood Group
                      </th>
                      <th>
                        <Package className="th-icon" />
                        Units
                      </th>
                      <th>
                        <CheckCircle className="th-icon" />
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation, index) => (
                      <tr key={index} className="table-row">
                        <td className="date-cell">{formatDate(donation.date)}</td>
                        <td className="location-cell">{donation.location}</td>
                        <td className="blood-cell">
                          <span className="blood-badge">{donation.bloodGroup}</span>
                        </td>
                        <td className="units-cell">{donation.units}</td>
                        <td className="status-cell">
                          <span className={`status-badge ${donation.status.toLowerCase()}`}>
                            {donation.status === "Completed" ? (
                              <CheckCircle className="status-icon" />
                            ) : (
                              <XCircle className="status-icon" />
                            )}
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-cards">
                {donations.map((donation, index) => (
                  <div key={index} className="donation-card-mobile">
                    <div className="card-mobile-header">
                      <div className="mobile-date">
                        <Calendar className="mobile-icon" />
                        {formatDate(donation.date)}
                      </div>
                      <span className={`status-badge ${donation.status.toLowerCase()}`}>
                        {donation.status === "Completed" ? (
                          <CheckCircle className="status-icon" />
                        ) : (
                          <XCircle className="status-icon" />
                        )}
                        {donation.status}
                      </span>
                    </div>
                    <div className="card-mobile-content">
                      <div className="mobile-info-row">
                        <MapPin className="mobile-icon" />
                        <span className="mobile-label">Location:</span>
                        <span className="mobile-value">{donation.location}</span>
                      </div>
                      <div className="mobile-info-row">
                        <Droplets className="mobile-icon" />
                        <span className="mobile-label">Blood Group:</span>
                        <span className="blood-badge">{donation.bloodGroup}</span>
                      </div>
                      <div className="mobile-info-row">
                        <Package className="mobile-icon" />
                        <span className="mobile-label">Units:</span>
                        <span className="mobile-value">{donation.units}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationHistory;