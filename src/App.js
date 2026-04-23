import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Scan from './screens/Scan';
import History from './screens/History';
import About from './screens/About';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Navbar />
        </div>
      </div>
    </Router>
  );
}

export default App;