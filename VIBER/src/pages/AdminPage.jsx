import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trash2, Edit3, User, CheckCircle, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function AdminPage({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }
      
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (targetId) => {
    if (!window.confirm("Are you sure you want to permanently delete this user? All their resources and messages will be wiped.")) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${targetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      
      setUsers(users.filter(u => u.id !== targetId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateCategory = async (targetId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${targetId}/category`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ category: newCategory })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update category');
      }

      setUsers(users.map(u => u.id === targetId ? { ...u, category: newCategory } : u));
      setEditingCategory(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditing = (userId, currentCategory) => {
    setEditingCategory(userId);
    setNewCategory(currentCategory || 'Seeker');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 overflow-hidden">
      <Sidebar activeTab="" user={user} />
      
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="flex items-center gap-4 border-b border-red-100 pb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                Administration Panel
              </h1>
              <p className="text-slate-500 font-medium">Manage network topology, roles, and network access.</p>
            </div>
          </header>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">CamPus User Directory</h2>
              <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-bold border border-rose-200">
                {users.length} Total Nodes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm tracking-wide">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">Retrieving secure logs...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No users found.</td></tr>
                  ) : (
                    users.map((target) => (
                      <tr key={target.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl flex flex-shrink-0 items-center justify-center font-bold shadow-sm">
                              {target.avatar || 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{target.name}</p>
                              <p className="text-xs text-slate-500">{target.major || 'Undeclared'} • {target.year || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600">{target.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            target.role === 'Admin' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {target.role || 'User'}
                          </span>
                        </td>
                        <td className="p-4">
                          {editingCategory === target.id ? (
                            <div className="flex items-center gap-2">
                              <select 
                                value={newCategory} 
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-sm focus:border-red-500 focus:outline-none"
                              >
                                <option value="Seeker">Seeker</option>
                                <option value="Helper">Helper</option>
                                <option value="Mentor">Mentor</option>
                              </select>
                              <button 
                                onClick={() => handleUpdateCategory(target.id)}
                                className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                target.category === 'Mentor' ? 'bg-purple-100 text-purple-600 border border-purple-200' :
                                target.category === 'Helper' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' :
                                'bg-blue-100 text-blue-600 border border-blue-200'
                              }`}>
                                {target.category || 'Seeker'}
                              </span>
                              <button 
                                onClick={() => startEditing(target.id, target.category)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-indigo-600 transition-all rounded-lg hover:bg-indigo-50"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {target.id !== user?.id && (
                            <button
                              onClick={() => handleDeleteUser(target.id)}
                              className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              title="Delete Login"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
