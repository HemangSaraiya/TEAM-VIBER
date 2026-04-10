import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white shadow-sm border border-slate-200 backdrop-blur-xl rounded-3xl border border-slate-200 p-8 space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your CamPus account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                className="w-full bg-white shadow-sm border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 placeholder-zinc-500 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                placeholder="your.email@campus.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                className="w-full bg-white shadow-sm border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 placeholder-zinc-500 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-400 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}