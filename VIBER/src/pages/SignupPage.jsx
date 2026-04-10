import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, User, Lock, GraduationCap, Calendar, Phone, CheckCircle, 
  ArrowLeft, ArrowRight, Shield, Zap 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage({ setIsAuthenticated, setUser }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    major: '',
    year: '',
    skills: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 2) {
      if (!formData.major.trim()) newErrors.major = 'Major is required';
      if (!formData.year) newErrors.year = 'Year is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to register');
        }
        
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUser(data.user);
        navigate('/dashboard');
      } catch (err) {
        setErrors({ submit: err.message });
      }
    }
  };

  const steps = [
    { title: 'Account Setup', subtitle: 'Create your profile' },
    { title: 'Academic Info', subtitle: 'Tell us about your studies' },
    { title: 'Welcome!', subtitle: 'Join the CamPus network' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-pink-900/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Join CamPus
              </h1>
              <p className="text-xl text-zinc-300">Step {step} of {steps.length}</p>
              <div className="flex justify-center gap-2 mt-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index + 1 <= step 
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 scale-125' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl text-center font-medium">
                {errors.submit}
              </div>
            )}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                      errors.name ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                    }`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                      errors.email ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                    }`}
                    placeholder="john.doe@campus.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                        errors.password ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                      }`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                        errors.confirmPassword ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                      }`}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Major / Field of Study
                  </label>
                  <input
                    type="text"
                    className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                      errors.major ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                    }`}
                    placeholder="Computer Science, Biology, etc."
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  />
                  {errors.major && <p className="text-red-400 text-sm mt-1">{errors.major}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Year
                    </label>
                    <select
                      className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg ${
                        errors.year ? 'border-red-500/50 ring-2 ring-red-500/30' : ''
                      }`}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    >
                      <option value="">Select year</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                    {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all text-lg"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Skills / Interests (Optional)
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all resize-vertical"
                    placeholder="Python, Data Analysis, Machine Learning, Research..."
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome to CamPus!</h2>
                  <p className="text-xl text-zinc-400">Your account has been created successfully</p>
                </div>
                <div className="text-left max-w-md mx-auto space-y-3 text-sm text-zinc-500">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Your data is encrypted and secure</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>Real-time notifications enabled</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-8 border-t border-white/10">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 0.98 }}
                  className="flex-1 md:flex-none px-6 py-4 text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                  onClick={prevStep}
                  type="button"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </motion.button>
              )}
              
              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={step < 3 ? nextStep : handleSubmit}
                  type="button"
                  className="flex-1 md:flex-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  {step === 2 ? 'Create Account' : 'Continue'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-emerald-500/50 transition-all"
                >
                  Get Started
                </motion.button>
              )}
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-zinc-500">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}