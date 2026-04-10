import React from 'react';
import Sidebar from '../components/Sidebar';

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 overflow-hidden">
      <Sidebar activeTab="profile" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Profile</h1>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-2xl">
          <p className="text-zinc-500">Profile management coming soon...</p>
        </div>
      </div>
    </div>
  );
}