import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    setIsAuthenticated(true);
    setUser({ name: 'John Doe', avatar: 'JD', role: 'student' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your CamPus account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                placeholder="your.email@campus.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-zinc-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}