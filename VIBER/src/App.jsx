import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-purple-500/30">
      {currentView === 'landing' ? (
         <LandingPage onEnter={() => setCurrentView('dashboard')} />
      ) : (
         <Dashboard onLogout={() => setCurrentView('landing')} />
      )}
    </div>
  );
}