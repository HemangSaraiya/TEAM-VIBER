import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ title, value, trend, icon, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group p-8 rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl hover:border-orange-500/30 hover:bg-orange-50 border border-orange-100 transition-all cursor-pointer relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="p-3 bg-orange-50 border border-orange-100 backdrop-blur-sm rounded-2xl group-hover:bg-orange-500/20 transition-all">
          <span className="text-2xl">{icon}</span>
        </div>
        <span className="text-sm font-semibold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
          {trend}
        </span>
      </div>
      
      <h3 className="text-slate-500 text-sm font-medium mb-2 opacity-90">{title}</h3>
      <p className="text-4xl font-bold gradient-text tracking-tight">{value}</p>
    </motion.div>
  );
}