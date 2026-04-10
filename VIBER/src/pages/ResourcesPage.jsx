import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ResourceCard from '../components/ResourceCard';

export default function ResourcesPage({ user }) {
  const [resources, setResources] = useState([]);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState({ title: '', type: 'Offer', tags: '' });

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources');
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Failed to fetch resources', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDeleteResource = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchResources();
    } catch (error) {
      console.error('Failed to delete resource', error);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const tagsArray = newPostContent.tags.split(',').map(t => t.trim()).filter(Boolean);
      await fetch('/api/resources', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...newPostContent, tags: tagsArray })
      });
      setShowNewPostModal(false);
      setNewPostContent({ title: '', type: 'Offer', tags: '' });
      fetchResources();
    } catch (error) {
      console.error('Failed to create resource', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 overflow-hidden">
      <Sidebar activeTab="resources" />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between backdrop-blur-md">
          <h1 className="text-2xl font-bold gradient-text">Resources Directory</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowNewPostModal(true)} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-medium">
              + New Post
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center font-bold text-white">
              {user?.avatar || 'JD'}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  {...resource} 
                  onDelete={user?.name === resource.author ? () => handleDeleteResource(resource.id) : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* New Post Form Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Create New Opportunity</h2>
              <form onSubmit={handleCreateResource} className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Title</label>
                  <input required value={newPostContent.title} onChange={e => setNewPostContent({...newPostContent, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2" placeholder="Ex: Need a Study Buddy" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Type</label>
                  <select value={newPostContent.type} onChange={e => setNewPostContent({...newPostContent, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <option value="Offer">Offer</option>
                    <option value="Request">Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Tags (comma separated)</label>
                  <input value={newPostContent.tags} onChange={e => setNewPostContent({...newPostContent, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2" placeholder="React, Study, Tutor" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowNewPostModal(false)} className="flex-1 py-2 text-zinc-400 hover:text-white">Cancel</button>
                  <button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold py-2">Post</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
