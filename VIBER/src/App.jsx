
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';

import ResourcesPage from './pages/ResourcesPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          handleLogout();
        }
      })
      .catch(() => {
        handleLogout();
      });
    } else {
      // If no token exists and they are on a protected route, boot them
      const currentPath = window.location.pathname;
      if (['/dashboard', '/resources', '/messages', '/profile'].some(p => currentPath.startsWith(p))) {
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-slate-900">
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/dashboard/*" element={<Dashboard user={user} />} />
          <Route path="/resources" element={<ResourcesPage user={user} />} />
          
          <Route path="/messages" element={<MessagesPage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}