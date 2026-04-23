import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-screen">
      <div className="scan-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>About</h1>
      </div>

      <div className="about-hero">
        <div className="about-shield">
          <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        </div>
        <h2>KavachSMS</h2>
        <p>AI Phishing Shield for India</p>
        <span className="version">Version 1.0.0</span>
      </div>

      <div className="about-card">
        <h3>What is KavachSMS?</h3>
        <p>KavachSMS is an AI-powered phishing detection app that protects Indian smartphone users from SMS and WhatsApp scams — including Digital Arrest frauds, fake bank alerts, prize scams, and parcel scams.</p>
      </div>

      <div className="about-card">
        <h3>The Problem</h3>
        <p>India recorded 22.68 lakh cybercrime cases in 2024 with ₹22,845 crore in losses — a 206% increase over 2023. Digital Arrest scams alone caused ₹1,935 crore in losses. KavachSMS intercepts scams before victims act on them.</p>
      </div>

      <div className="about-card">
        <h3>How It Works</h3>
        <div className="tech-row">
          <div className="tech-item">
            <span className="tech-icon">🧠</span>
            <span className="tech-label">NLP Classifier</span>
            <span className="tech-desc">37 Indian phishing patterns including Hindi and Hinglish</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">📱</span>
            <span className="tech-label">Sender Verification</span>
            <span className="tech-desc">Database of known fraud sender IDs and patterns</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🔒</span>
            <span className="tech-label">Privacy First</span>
            <span className="tech-desc">All analysis runs locally — no data sent to servers</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">⚡</span>
            <span className="tech-label">Instant Results</span>
            <span className="tech-desc">Four-level threat classification in under a second</span>
          </div>
        </div>
      </div>

      <div className="about-card">
        <h3>Tech Stack</h3>
        <div className="stack-row">
          <span className="stack-pill">React.js</span>
          <span className="stack-pill">NLP</span>
          <span className="stack-pill">JavaScript</span>
          <span className="stack-pill">PWA</span>
          <span className="stack-pill">localStorage</span>
        </div>
      </div>

      <div className="about-card">
        <h3>Developer</h3>
        <p>Built by <strong>Rohan Gupta</strong> — co-inventor of Indian Patent for securing online classes through AI analytics. KavachSMS is part of a broader portfolio of AI-powered safety and security systems.</p>
      </div>

      <div className="about-card emergency">
        <h3>Emergency</h3>
        <p>If you have been scammed or are being threatened:</p>
        <div className="emergency-number">📞 1930</div>
        <p className="emergency-sub">National Cyber Crime Helpline</p>
        <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="emergency-link">
          cybercrime.gov.in →
        </a>
      </div>

    </div>
  );
}

export default About;