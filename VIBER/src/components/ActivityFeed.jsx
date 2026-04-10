import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, BookOpen } from 'lucide-react';

const activities = [
  { user: 'Sarah J.', action: 'offered Python tutoring', time: '2m ago', icon: BookOpen },
  { user: 'Mike R.', action: 'joined Algorithms study group', time: '14m ago', icon: User },
  { user: 'Campus Bot', action: 'new resource matches found', time: '1h ago', icon: MessageCircle }
];

export default function ActivityFeed() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-8">Campus Pulse</h2>
      <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl">
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 relative group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 border border-orange-500/30 group-hover:scale-110 transition-all">
                <activity.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">{activity.user}</p>
                <p className="text-slate-600 text-sm">{activity.action}</p>
                <p className="text-xs text-orange-600 mt-1 font-medium">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}