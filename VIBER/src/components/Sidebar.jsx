import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, MessageCircle, Bell, User, GraduationCap,
  Search, Plus, LogOut, Bot 
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { id: 'resources', icon: BookOpen, label: 'Resources', path: '/resources', badge: 3 },
  { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages', badge: 2 },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' }
];

export default function Sidebar({ activeTab, onPostResource }) {
  const location = useLocation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-sm border border-slate-200 border-r flex flex-col p-6 shrink-0 relative z-20"
      >
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">CamPus</h1>
              <p className="text-sm text-slate-500">Academic Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 mb-12">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `group flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-2 border-orange-500/30 text-slate-900 shadow-lg' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50 border border-orange-100 hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => setIsChatbotOpen(true)}
            className="group flex items-center gap-3 p-4 w-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 rounded-2xl text-indigo-600 hover:text-indigo-800 hover:bg-indigo-500/20 transition-all shadow-sm"
          >
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-500" />
            <span className="font-medium">AI Chatbot</span>
          </button>

          <button 
            onClick={onPostResource} 
            className="group flex items-center gap-3 p-4 w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 hover:text-emerald-800 hover:bg-emerald-500/20 transition-all"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="font-medium">Post Resource</span>
          </button>

          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center gap-3 p-4 w-full text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Render Chatbot Modal Globally alongside Sidebar */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
}