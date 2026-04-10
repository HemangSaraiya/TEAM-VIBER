import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Tag } from 'lucide-react';

export default function ResourceCard({ title, type, tags, author }) {
  const typeColors = {
    Offer: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    Request: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/25 transition-all cursor-pointer overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${typeColors[type]}`}>
          {type}
        </span>
        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
          <User className="w-5 h-5 text-zinc-400 group-hover:text-purple-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 leading-tight group-hover:text-white transition-colors line-clamp-2">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white/10 border border-white/20 rounded-xl text-xs text-zinc-400 group-hover:text-zinc-300 transition-all">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>by {author}</span>
        <Clock className="w-3 h-3" />
        <span>2h ago</span>
      </div>
    </motion.div>
  );
}