import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User, CheckCircle } from 'lucide-react';

export default function ProfilePage({ user }) {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    year: '',
    skills: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        major: user.major || '',
        year: user.year || '',
        skills: user.skills || ''
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 overflow-hidden">
      <Sidebar activeTab="profile" />
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">My Profile</h1>
              <p className="text-zinc-400">Manage your persona and study focus</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg text-2xl font-bold text-white">
              {user?.avatar || <User />}
            </div>
          </header>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Display Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-500 mb-2">Email Address (Locked)</label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-zinc-500 cursor-not-allowed"
                    value={user?.email || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Major / Field of Study</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 transition-all"
                    placeholder="e.g. Computer Science"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Year</label>
                  <select
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 transition-all cursor-pointer"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option className="bg-zinc-900" value="">Select year</option>
                    <option className="bg-zinc-900" value="Freshman">Freshman</option>
                    <option className="bg-zinc-900" value="Sophomore">Sophomore</option>
                    <option className="bg-zinc-900" value="Junior">Junior</option>
                    <option className="bg-zinc-900" value="Senior">Senior</option>
                    <option className="bg-zinc-900" value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">Skills & Interests (comma isolated)</label>
                <textarea
                  rows="4"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 transition-all"
                  placeholder="Python, React, Statistics, UI Design..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  {saved && (
                     <div className="flex items-center gap-2 text-emerald-400 font-medium">
                       <CheckCircle className="w-5 h-5"/> Profile updated!
                     </div>
                  )}
                </div>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}