import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import ResourceCard from '../components/ResourceCard';
import ActivityFeed from '../components/ActivityFeed';

const DUMMY_STATS = [
  { title: 'Campus Reputation', value: '4,892', trend: '+12%', icon: '🎓' },
  { title: 'Active Connections', value: '148', trend: '+5%', icon: '👥' },
  { title: 'Resources Shared', value: '32', trend: '+2%', icon: '📚' }
];

const DUMMY_RESOURCES = [
  { id: 1, title: 'Python Tutor for Data Science', type: 'Offer', tags: ['Tutoring', 'Python'], author: 'Campus 1' },
  { id: 2, title: 'Group Study for Algorithms', type: 'Request', tags: ['Study Group', 'Algorithms'], author: 'Campus 2' }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 overflow-hidden">
      <Sidebar activeTab="dashboard" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between backdrop-blur-md">
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campus..."
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 pl-10 text-sm placeholder-zinc-500 focus:border-purple-500/50"
              />
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DUMMY_STATS.map((stat, i) => (
                <StatsCard key={stat.title} {...stat} delay={i * 0.1} />
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Resources */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Campus Opportunities</h2>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-medium">
                    + New Post
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {DUMMY_RESOURCES.map((resource) => (
                    <ResourceCard key={resource.id} {...resource} />
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}