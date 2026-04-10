import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Combine, Sparkles } from 'lucide-react';

export default function LandingPage({ onEnter = () => {} }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <Combine className="w-6 h-6 text-purple-400" />
          Nexus<span className="text-zinc-500">Eco</span>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onEnter}
          className="px-5 py-2.5 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
        >
          Sign in
        </motion.button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col justify-center items-center h-[calc(100vh-88px)] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-8 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>The New Digital Frontier</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-none mb-6"
        >
          Coordinate.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500">
            Co-create.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-base md:text-lg lg:text-xl text-zinc-400 mb-10 font-light"
        >
          Join a dynamic ecosystem where resources flow organically. Connect, share, and build the future together in a beautifully seamless environment.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="group relative flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10">Sign Up</span>
          <div className="relative z-10 bg-black/10 rounded-full p-2 group-hover:bg-black/20 transition-colors">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </motion.button>
      </main>
    </div>
  );
}
