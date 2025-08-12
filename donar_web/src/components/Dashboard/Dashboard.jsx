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
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const donor_id = user?.donor_id || localStorage.getItem('donor_id');
    if (donor_id) {
      fetch(`http://localhost:5000/api/dashboard/${donor_id}`)
        .then(res => res.json())
        .then(data => setDashboardData(data));
    }
  }, [user]);

  const DashboardOverview = () => (
    <div className="dashboard-overview" style={{maxWidth:800,margin:'0 auto',padding:'32px 0'}}>
      {/* Blood Group & Status */}
      <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <h2>🩸 Blood Group</h2>
          <div style={{fontSize:28,fontWeight:'bold'}}>{dashboardData?.blood_group || '-'}</div>
        </div>
        <div>
          <h2>🏆 Total Donations</h2>
          <div style={{fontSize:28,fontWeight:'bold'}}>{dashboardData?.total_donations || '-'}</div>
        </div>
      </div>

      {/* Donation Details */}
      <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',marginBottom:24}}>
        <h2>📋 Donation Details</h2>
        <div><strong>Last Donation:</strong> {dashboardData?.last_donation_date || '-'}</div>
        <div><strong>Next Eligible Date:</strong> {dashboardData?.next_eligible_date || '-'}</div>
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