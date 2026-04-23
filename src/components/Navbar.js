import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      path: '/',
      label: 'Home',
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill={active ? '#E24B4A' : '#8E8E93'} width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    {
      path: '/scan',
      label: 'Scan',
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill={active ? '#E24B4A' : '#8E8E93'} width="24" height="24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      )
    },
    {
      path: '/history',
      label: 'History',
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill={active ? '#E24B4A' : '#8E8E93'} width="24" height="24">
          <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      )
    },
    {
      path: '/about',
      label: 'About',
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill={active ? '#E24B4A' : '#8E8E93'} width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      )
    }
  ];

  return (
    <nav className="navbar">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`nav-tab ${active ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon(active)}
            <span style={{color: active ? '#E24B4A' : '#8E8E93'}}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default Navbar;