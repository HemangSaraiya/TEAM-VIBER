import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Zap, GraduationCap, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const features = [
    { icon: Users, title: "CamPus Network", desc: "Connect with students, professors, and alumni" },
    { icon: Zap, title: "Resource Matching", desc: "Find study materials, tutors, and group projects" },
    { icon: GraduationCap, title: "Skill Sharing", desc: "Offer and request academic expertise" },
    { icon: Link2, title: "Real-time Collaboration", desc: "Chat, share files, and work together instantly" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-pink-900/20" />

      <nav className="px-8 py-6 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <GraduationCap className="w-8 h-8 text-orange-600" />
          <span>CamPus</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2.5 border border-orange-100 rounded-full text-sm hover:bg-orange-50 border border-orange-100 transition-all">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all">
            Join CamPus
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-8 max-w-7xl mx-auto pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400 border border-orange-500/20 rounded-full text-purple-300 mb-8"
        >
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Academic Ecosystem</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tight leading-none mb-8"
        >
          Your <span className="gradient-text block">CamPus</span>
          <span className="block text-4xl md:text-6xl lg:text-7xl text-slate-600">Connected</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed"
        >
          Connect with peers, share resources, find collaborators, and accelerate your academic journey.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all"
          >
            Join CamPus
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/login" className="px-8 py-4 border-2 border-orange-100 rounded-2xl hover:bg-orange-50 border border-orange-100 transition-all">
            Explore
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 max-w-7xl mx-auto pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group p-8 rounded-3xl bg-white shadow-sm border border-slate-200 hover:border-orange-500/30 hover:bg-orange-50 border border-orange-100 transition-all backdrop-blur-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-slate-900 transition-colors">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}