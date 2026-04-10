import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { User, Send } from 'lucide-react';

export default function MessagesPage({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Simple polling
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ content: newMessage })
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      <Sidebar activeTab="messages" />
      <div className="flex-1 flex flex-col p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Campus Conversation</h1>
          <p className="text-slate-600">Join the global discussion board!</p>
        </header>

        {/* Message Feed */}
        <div className="flex-1 bg-white shadow-sm border border-slate-200 backdrop-blur-xl rounded-t-3xl border border-slate-200 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
          {messages.length === 0 ? (
             <div className="text-slate-500 text-center py-12">No messages yet. Start the conversation!</div>
          ) : (
            messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-4 p-4 rounded-2xl ${msg.author === user?.name ? 'bg-orange-500/10 border border-orange-500/20 ml-12' : 'bg-white shadow-sm border border-slate-200 border border-slate-100 mr-12'}`}
              >
                <div className="w-10 h-10 shrink-0 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  {msg.avatar || <User className="w-5 h-5 text-slate-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900 text-sm">{msg.author}</span>
                    <span className="text-xs text-slate-500">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white backdrop-blur-xl rounded-b-3xl border-x border-b border-slate-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a comment..." 
              className="flex-1 bg-white shadow-sm border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-orange-500/50 outline-none"
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-lg"
            >
              <Send className="w-6 h-6 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}