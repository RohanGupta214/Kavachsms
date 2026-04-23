import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    setHistory(h);
  }, []);

  function clearHistory() {
    if (window.confirm('Clear all scan history?')) {
      localStorage.removeItem('scanHistory');
      setHistory([]);
    }
  }

  function getLevelColor(level) {
    if (level === 'Safe') return {color:'#1E6B00', bg:'#EAF3DE'};
    if (level === 'Suspicious') return {color:'#7A4F00', bg:'#FFF3CD'};
    if (level === 'Phishing') return {color:'#8B0000', bg:'#FCEBEB'};
    return {color:'#6B0000', bg:'#FCEBEB'};
  }

  return (
    <div className="history-screen">
      <div className="scan-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>Scan History</h1>
        {history.length > 0 && (
          <button className="clear-btn" onClick={clearHistory}>Clear</button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="#C7C7CC" width="48" height="48">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <p>No scans yet.</p>
          <p>Scan a message to see your history here.</p>
          <button className="scan-btn" onClick={() => navigate('/scan')}>
            Scan a Message
          </button>
        </div>
      ) : (
        <div className="history-list">
          <p className="history-count">{history.length} scan{history.length !== 1 ? 's' : ''} total</p>
          {history.map((scan, i) => {
            const {color, bg} = getLevelColor(scan.level);
            return (
              <div key={i} className="history-card" style={{background: bg, borderLeft: `4px solid ${color}`}}>
                <div className="history-top">
                  <span className="history-level" style={{color}}>{scan.level}</span>
                  <span className="history-pct" style={{color}}>{scan.pct}% risk</span>
                </div>
                <p className="history-msg">{scan.message.substring(0, 80)}{scan.message.length > 80 ? '...' : ''}</p>
                <div className="history-bottom">
                  <span className="history-sender">From: {scan.sender}</span>
                  <span className="history-time">{scan.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;