Dashboard.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, Compass, MessageSquare, Bell, LogOut, 
  Search, Plus, Activity, ArrowUpRight, Zap, Target, Plus as XIcon 
} from 'lucide-react';

const DUMMY_RESOURCES = [
  { id: 1, title: 'Senior React Dev for Core Team', type: 'Request', tags: ['Engineering', 'Urgent'], author: 'Alex F.' },
  { id: 2, title: 'UX Audit for Web3 Projects', type: 'Offer', tags: ['Design', 'Crypto'], author: 'Sarah J.' },
  { id: 3, title: 'Access to 10k GPU Cluster', type: 'Offer', tags: ['Compute', 'AI'], author: 'Nova Labs' },
  { id: 4, title: 'Smart Contract Auditor Needed', type: 'Request', tags: ['Security', 'Blockchain'], author: 'BlockSec' }
];

const DUMMY_FEED = [
  { id: 1, user: 'Elena', action: 'joined the ecosystem', time: '2m ago' },
  { id: 2, user: 'Marcus', action: 'claimed resource "UX Audit"', time: '14m ago' },
  { id: 3, user: 'System', action: 'network capacity expanded', time: '1h ago' },
  { id: 4, user: 'Alex F.', action: 'published a new request', time: '3h ago' }
];

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 lg:w-64 border-r border-white/5 flex flex-col justify-between p-4 bg-zinc-950/50 backdrop-blur-xl relative z-20 shrink-0"
      >
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              N
            </div>
            <span className="hidden lg:block font-semibold tracking-wide">CamPus</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'home', icon: LayoutGrid, label: 'Dashboard' },
              { id: 'explore', icon: Compass, label: 'Explore' },
              { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 3 },
              { id: 'notifications', icon: Bell, label: 'Alerts', badge: 1 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                {item.badge && activeTab !== item.id && (
                  <span className="hidden lg:flex w-5 h-5 ml-auto text-[10px] items-center justify-center bg-purple-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-3 mt-auto text-zinc-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="hidden lg:block text-sm font-medium">Disconnect</span>
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex justify-between items-center px-4 lg:px-8 shrink-0 backdrop-blur-md relative z-10 w-full">
          <div className="relative group w-48 sm:w-64 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search ecosystem..." 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Resource</span>
          </motion.button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8 pb-20"
          >
            {/* Stats Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Global Reputation', value: '4,892', icon: Target, trend: '+12%' },
                { title: 'Active Connections', value: '148', icon: Activity, trend: '+5%' },
                { title: 'Resources Shared', value: '32', icon: Zap, trend: '+2%' },
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.title}
                  className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-zinc-800/50 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-zinc-500 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Grid: Resources & Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Opportunities / Resources Section - Takes 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="text-xl font-medium tracking-tight">Active Opportunities</h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 group">
                    View all <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DUMMY_RESOURCES.map((resource, i) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      key={resource.id}
                      className="p-6 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          resource.type === 'Request' ? 'bg-orange-500/10 text-orange-400' : 'bg-indigo-500/10 text-indigo-400'
                        }`}>
                          {resource.type}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold shadow-inner">
                          {resource.author.charAt(0)}
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-4 group-hover:text-purple-300 transition-colors leading-tight">{resource.title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {resource.tags.map(tag => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activity Feed Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-medium tracking-tight">Ecosystem Pulse</h2>
                <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5">
                  <div className="space-y-6">
                    {DUMMY_FEED.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        key={item.id}
                        className="flex gap-4 relative before:absolute before:left-[11px] before:top-8 before:bottom-[-24px] before:w-[1px] before:bg-white/10 last:before:hidden"
                      >
                        <div className="w-6 h-6 shrink-0 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center mt-0.5 z-10" />
                        <div>
                          <p className="text-sm">
                            <span className="font-semibold text-white">{item.user}</span>{' '}
                            <span className="text-zinc-400">{item.action}</span>
                          </p>
                          <span className="text-xs text-purple-400/80 font-medium">{item.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Floating Chat Interaction UI */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="absolute bottom-6 right-6 w-[340px] max-w-[calc(100vw-48px)] h-96 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-800/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-medium text-sm">Global Comm-Link</h3>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                  <XIcon className="w-4 h-4 rotate-45" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end space-y-4 custom-scrollbar">
                 <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm text-sm w-[85%] text-zinc-300">
                   System: Anomaly detected in sector 4.
                 </div>
                 <div className="bg-gradient-to-tr from-purple-600/30 to-indigo-600/30 border border-purple-500/20 p-3 rounded-2xl rounded-tr-sm text-sm w-[85%] self-end shadow-inner text-white">
                   Sending reinforcement resources now. I'll update the ecosystem registry.
                 </div>
              </div>
              
              <div className="p-4 border-t border-white/10 bg-zinc-900/50">
                <input 
                  type="text" 
                  placeholder="Transmit message..." 
                  className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 px-4 text-sm outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all placeholder:text-zinc-600"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (to toggle chat) */}
        {!isChatOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] text-white z-40 group"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </main>
    </div>
  );
}