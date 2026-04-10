import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ResourceCard from '../components/ResourceCard';

const resources = [
  { id: 1, title: 'Advanced Machine Learning Notes', type: 'Offer', tags: ['ML', 'Notes', 'Stanford'], author: 'Dr. Emily C.' },
  { id: 2, title: 'Need Partner for Thesis Research', type: 'Request', tags: ['Research', 'Thesis'], author: 'Alex T.' },
  { id: 3, title: 'Calculus II Problem Sets', type: 'Offer', tags: ['Math', 'Calculus'], author: 'Math Club' },
  { id: 4, title: 'Looking for Economics Study Group', type: 'Request', tags: ['Economics', 'Study Group'], author: 'Sophie L.' }
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = ['all', 'offers', 'requests'];

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 overflow-hidden">
      <Sidebar activeTab="resources" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Resources</h1>
            <p className="text-zinc-500">Discover academic opportunities</p>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-semibold">
            + Post Resource
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Tabs */}
            <div className="flex gap-2 bg-white/5 backdrop-blur-xl p-1 rounded-2xl">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map(resource => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}