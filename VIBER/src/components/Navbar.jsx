import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isAuthenticated, user }) {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="h-16 border-b border-slate-100 backdrop-blur-xl px-6 flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl gradient-text">
        <User className="w-6 h-6" />
        CamPus
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            className="bg-white shadow-sm border border-slate-200 rounded-xl pl-10 pr-4 py-2 px-3 text-sm placeholder-zinc-500 w-72 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
            placeholder="Search campus resources..."
          />
        </div>
        
        <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-slate-900 text-xs rounded-full flex items-center justify-center font-bold">5</span>
        </button>
        
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </nav>
  );
}