import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, MessageCircle, Bell, User, GraduationCap,
  Search, Plus, LogOut 
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { id: 'resources', icon: BookOpen, label: 'Resources', path: '/resources', badge: 3 },
  { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages', badge: 2 },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' }
];

export default function Sidebar({ activeTab }) {
  const location = useLocation();

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 shrink-0"
    >
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">CamPus</h1>
            <p className="text-sm text-zinc-500">Academic Hub</p>
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
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-2 border-purple-500/30 text-white shadow-lg' 
                : 'text-zinc-400 hover:text-white hover:bg-white/10 hover:shadow-md'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 p-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input 
              className="flex-1 bg-transparent outline-none text-sm placeholder-zinc-500"
              placeholder="Quick search..."
            />
          </div>
        </div>
        
        <button className="group flex items-center gap-3 p-4 w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/30 transition-all">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-medium">Post Resource</span>
        </button>

        <button className="flex items-center gap-3 p-4 w-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
}