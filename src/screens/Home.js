import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
  const threats = history.filter(s => s.level !== 'Safe').length;
  const safeRate = history.length > 0 ? Math.round(((history.length - threats) / history.length) * 100) : 100;

  return (
    <div className="home">

      <div className="home-header">
        <div className="header-top-row">
          <div className="header-left">
            <div className="shield-wrap">
              <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="app-title">KavachSMS</h1>
              <p className="app-sub">AI Phishing Shield · India</p>
            </div>
          </div>
          <div className="header-badge">v1.0</div>
        </div>

        <div className="hero-text">
          <h2>Stay protected.<br/>Scan before you click.</h2>
          <p>Real-time AI detection for SMS & WhatsApp scams</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-number">{history.length}</span>
          <span className="stat-label">Total Scans</span>
        </div>
        <div className="stat-card stat-card-red">
          <span className="stat-number">{threats}</span>
          <span className="stat-label">Threats Found</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{safeRate}%</span>
          <span className="stat-label">Safe Rate</span>
        </div>
      </div>

      <button className="scan-btn-home" onClick={() => navigate('/scan')}>
        <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
        Scan a Message
      </button>

      <div className="threat-banner">
        <div className="threat-banner-icon">⚠️</div>
        <div>
          <p className="threat-banner-title">India Cyber Alert 2024</p>
          <p className="threat-banner-sub">₹22,845 Cr lost to cyber fraud · 22.68 lakh cases filed</p>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Scans</h2>
          {history.length > 0 && (
            <button className="see-all" onClick={() => navigate('/history')}>See all →</button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="#C7C7CC" width="40" height="40">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <p>No scans yet</p>
            <span>Scan a suspicious message to get started</span>
          </div>
        ) : (
          history.slice(0, 3).map((scan, i) => {
            const colors = {
              'Safe': {color:'#1E6B00', bg:'#EAF3DE'},
              'Suspicious': {color:'#7A4F00', bg:'#FFF3CD'},
              'Phishing': {color:'#8B0000', bg:'#FCEBEB'},
              'Digital Arrest Scam': {color:'#6B0000', bg:'#FCEBEB'}
            };
            const c = colors[scan.level] || colors['Safe'];
            return (
              <div key={i} className="recent-card" style={{background: c.bg, borderLeft: `4px solid ${c.color}`}}>
                <div className="recent-top">
                  <span className="recent-level" style={{color: c.color}}>{scan.level}</span>
                  <span className="recent-pct" style={{color: c.color}}>{scan.pct}% risk</span>
                </div>
                <p className="recent-msg">{scan.message.substring(0, 65)}{scan.message.length > 65 ? '...' : ''}</p>
                <span className="recent-time">{scan.time}</span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default Home;