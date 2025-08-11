// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../Dashboard/Profile/Profile';
import DonationHistory from '../Dashboard/History/DonationHistory';
import EligibilityCheck from '../Dashboard/Eligibility/EligibilityCheck';
import Notifications from '../Dashboard/Notifications/Notifications';
import Chatbot from '../Chatbot/Chatbot';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('overview');
  const [showHospitalAddress, setShowHospitalAddress] = useState(false);



  // Donor Information Card
  const DonorInfo = () => (
    <div className="donor-info-card" style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',marginBottom:24,maxWidth:600}}>
      <h2>🧑 Donor Information</h2>
      <div><strong>Full Name:</strong> {user?.name || '-'}</div>
      <div><strong>Age / DOB:</strong> {user?.age ? user.age : (user?.dob || '-')}</div>
      <div><strong>Gender:</strong> {user?.gender || '-'}</div>
      <div><strong>Blood Group:</strong> {user?.bloodType || '-'}</div>
      <div><strong>Contact Number:</strong> {user?.contact || '-'}</div>
      <div><strong>Email Address:</strong> {user?.email || '-'}</div>
      <div><strong>Address / Location:</strong> {user?.address || '-'}</div>
    </div>
  );

  // Donation History Table
  const donationHistory = user?.donationHistory || [
    {
      date: '2024-04-10',
      hospital: 'City General Hospital',
      location: 'Chennai',
      ago: '3 months ago'
    },
    {
      date: '2023-12-15',
      hospital: 'Red Cross Blood Bank',
      location: 'Bangalore',
      ago: '7 months ago'
    }
  ];

  const DonationHistoryTable = () => (
    <div className="donation-history-table" style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',maxWidth:800}}>
      <h2>🩸 Donation History</h2>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:8}}>Date</th>
            <th style={{padding:8}}>Hospital / Blood Bank</th>
            <th style={{padding:8}}>Location</th>
            <th style={{padding:8}}>Time Since</th>
          </tr>
        </thead>
        <tbody>
          {donationHistory.map((d, i) => (
            <tr key={i} style={{borderBottom:'1px solid #eee'}}>
              <td style={{padding:8}}>{d.date}</td>
              <td style={{padding:8}}>{d.hospital}</td>
              <td style={{padding:8}}>{d.location}</td>
              <td style={{padding:8}}>{d.ago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Dashboard Overview Component
  // Calculate next eligible date (90 days after last donation)
  let nextEligibleDate = '-';
  let lastDonationDate = user?.lastDonation || '13-05-2023';
  if (lastDonationDate) {
    // Parse date in DD-MM-YYYY or YYYY-MM-DD
    let parts = lastDonationDate.includes('-') && lastDonationDate.split('-');
    let dateObj;
    if (parts && parts[2]?.length === 4) {
      // DD-MM-YYYY
      dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
    } else if (parts && parts[0]?.length === 4) {
      // YYYY-MM-DD
      dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    }
    if (dateObj && !isNaN(dateObj)) {
      dateObj.setDate(dateObj.getDate() + 90);
      nextEligibleDate = dateObj.toLocaleDateString();
    }
  }

  const DashboardOverview = () => (
    <div className="dashboard-overview" style={{maxWidth:800,margin:'0 auto',padding:'32px 0'}}>
      {/* Blood Group & Status */}
      <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <h2>🩸 Blood Group</h2>
          <div style={{fontSize:28,fontWeight:'bold'}}>{user?.bloodType || 'O+'}</div>
        </div>
        <div>
          <h2>🏆 Total Donations</h2>
          <div style={{fontSize:28,fontWeight:'bold'}}>{user?.totalDonations || 4}</div>
        </div>
      </div>

      {/* Donation Details */}
      <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',marginBottom:24}}>
        <h2>📋 Donation Details</h2>
        <div><strong>Last Donation:</strong> {lastDonationDate}</div>
        <div><strong>Next Eligible Date:</strong> {nextEligibleDate}</div>
      </div>

      {/* Urgent Requests */}
      <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001'}}>
        <h2>🚨 Urgent Requests</h2>
        <div style={{color:'#dc2626',fontWeight:'bold',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
          O+ Blood needed urgently at 
          <span style={{textDecoration:'underline'}} onClick={() => setShowHospitalAddress(v => !v)}>
            Dr. Mehta's Hospital
          </span>
          <a
            href="https://www.google.com/maps?q=13.071605950299741, 80.24059174474662"
            target="_blank"
            rel="noopener noreferrer"
            style={{marginLeft:8, color:'#1976d2', textDecoration:'underline', fontWeight:'bold', fontSize:'0.95em'}}
          >
            View Map
          </a>
          <span style={{marginLeft:4}}>- 2 days ago</span>
        </div>
        {showHospitalAddress && (
          <div style={{marginTop:8, color:'#222', fontWeight:'normal', background:'#f3f4f6', padding:'8px 16px', borderRadius:8}}>
            Address: No.2/1,2, 3, Mc Nichols Road 3rd Ln, Chetpet, Chennai, Tamil Nadu 600031
          </div>
        )}
        <button 
          style={{marginTop:16, background:'#dc2626', color:'#fff', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:'bold', cursor:'pointer'}}
          onClick={() => setCurrentView('eligibilityChatbot')}
        >
          Check Eligibility Status
        </button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch(currentView) {
      case 'profile':
        return <Profile user={user} />;
      case 'history':
        return <DonationHistory user={user} />;
      case 'eligibilityChatbot':
        return (
          <div style={{maxWidth:800,margin:'0 auto',padding:'32px 0'}}>
            <Chatbot user={user} mode="eligibility" onClose={() => setCurrentView('overview')} />
          </div>
        );
      case 'eligibility':
        return <DashboardOverview />;
      case 'notifications':
        return <Notifications user={user} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="dashboard">
      {/* Animated Background Container */}
      <div className="background-container">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="dots-pattern"></div>
        <div className="floating-drop" style={{top: '20%', left: '10%', animationDelay: '0s'}}>
          <span className="drop-icon">🩸</span>
        </div>
        <div className="floating-drop" style={{top: '60%', right: '15%', animationDelay: '2s'}}>
          <span className="drop-icon">🩸</span>
        </div>
        <div className="floating-drop" style={{bottom: '30%', left: '70%', animationDelay: '4s'}}>
          <span className="drop-icon">🩸</span>
        </div>
      </div>

      <div className="dashboard-container">
        <main className="main-content">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;