// import React, { useState } from 'react';
// import LandingPage from './LandingPage';
// import Dashboard from './Dashboard';

// export default function App() {
//   const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

//   return (
//     <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-purple-500/30">
//       {currentView === 'landing' ? (
//          <LandingPage onEnter={() => setCurrentView('dashboard')} />
//       ) : (
//          <Dashboard onLogout={() => setCurrentView('landing')} />
//       )}
//     </div>
//   );
// }



// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
// // import { Home, Users, Box, Calendar, Activity, Settings, Bell, Search } from "lucide-react";

// // const NavItem = ({ to, icon, label }) => {
// //   const location = useLocation();
// //   const active = location.pathname === to;

// //   return (
// //     <Link
// //       to={to}
// //       className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
// //         active ? "bg-blue-500 text-white shadow" : "text-gray-600 hover:bg-gray-100"
// //       }`}
// //     >
// //       {icon}
// //       <span className="font-medium">{label}</span>
// //     </Link>
// //   );
// // };

// // const Sidebar = () => (
// //   <div className="w-64 h-screen bg-white border-r flex flex-col justify-between fixed">
// //     <div>
// //       <h1 className="text-2xl font-bold p-5 text-blue-600">Campus</h1>
// //       <nav className="space-y-2 px-3">
// //         <NavItem to="/" icon={<Home size={18} />} label="Dashboard" />
// //         <NavItem to="/members" icon={<Users size={18} />} label="Members" />
// //         <NavItem to="/resources" icon={<Box size={18} />} label="Resources" />
// //         <NavItem to="/bookings" icon={<Calendar size={18} />} label="Bookings" />
// //         <NavItem to="/activity" icon={<Activity size={18} />} label="Activity" />
// //         <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
// //       </nav>
// //     </div>

// //     <div className="p-4 border-t flex items-center gap-3">
// //       <div className="w-10 h-10 bg-blue-500 rounded-full" />
// //       <div>
// //         <p className="text-sm font-semibold">John Doe</p>
// //         <p className="text-xs text-gray-500">Admin</p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const Navbar = () => (
// //   <div className="ml-64 h-16 bg-white border-b flex items-center justify-between px-6">
// //     <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg w-1/3">
// //       <Search size={16} />
// //       <input className="bg-transparent outline-none w-full" placeholder="Search..." />
// //     </div>

// //     <div className="flex items-center gap-4">
// //       <Bell className="cursor-pointer text-gray-600 hover:text-black" />
// //       <div className="w-9 h-9 bg-blue-500 rounded-full" />
// //     </div>
// //   </div>
// // );

// // const StatCard = ({ title, value }) => (
// //   <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
// //     <p className="text-sm text-gray-500">{title}</p>
// //     <h2 className="text-3xl font-bold mt-1">{value}</h2>
// //   </div>
// // );

// // const Dashboard = () => (
// //   <div className="space-y-6">
// //     <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
// //       <StatCard title="Total Members" value="120" />
// //       <StatCard title="Resources" value="32" />
// //       <StatCard title="Bookings" value="14" />
// //       <StatCard title="Requests" value="6" />
// //     </div>

// //     <div className="grid md:grid-cols-2 gap-5">
// //       <div className="bg-white p-5 rounded-2xl shadow-sm">
// //         <h3 className="font-semibold mb-3">Recent Activity</h3>
// //         <ul className="space-y-3 text-sm">
// //           <li className="p-2 bg-gray-50 rounded">John booked Projector</li>
// //           <li className="p-2 bg-gray-50 rounded">Alice joined</li>
// //         </ul>
// //       </div>

// //       <div className="bg-white p-5 rounded-2xl shadow-sm">
// //         <h3 className="font-semibold mb-3">Quick Actions</h3>
// //         <div className="flex flex-wrap gap-3">
// //           <button className="btn">Add Member</button>
// //           <button className="btn">Add Resource</button>
// //           <button className="btn">Book Resource</button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const Members = () => (
// //   <div className="bg-white p-5 rounded-2xl shadow-sm">
// //     <div className="flex justify-between mb-4">
// //       <h2 className="font-semibold">Members</h2>
// //       <button className="btn">Add Member</button>
// //     </div>
// //     <table className="w-full text-sm">
// //       <thead className="text-gray-500">
// //         <tr>
// //           <th className="text-left py-2">Name</th>
// //           <th>Role</th>
// //           <th>Status</th>
// //           <th>Actions</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         <tr className="border-t hover:bg-gray-50">
// //           <td className="py-2">John Doe</td>
// //           <td><span className="badge-blue">Admin</span></td>
// //           <td>Active</td>
// //           <td className="text-red-500 cursor-pointer">Remove</td>
// //         </tr>
// //       </tbody>
// //     </table>
// //   </div>
// // );

// // const Resources = () => (
// //   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// //     {["Projector", "Camera", "Room"].map((r) => (
// //       <div key={r} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition">
// //         <h3 className="font-semibold text-lg">{r}</h3>
// //         <span className="badge-green">Available</span>
// //         <button className="btn mt-3">Request</button>
// //       </div>
// //     ))}
// //   </div>
// // );

// // const Bookings = () => (
// //   <div className="space-y-4">
// //     <h2 className="font-semibold">Bookings</h2>
// //     <div className="bg-white p-5 rounded-2xl shadow-sm">
// //       <p className="font-medium">Projector - John</p>
// //       <p className="text-sm text-gray-500">2:00 - 4:00 PM</p>
// //       <div className="flex gap-3 mt-3">
// //         <button className="btn">Approve</button>
// //         <button className="btn-outline">Reject</button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const ActivityPage = () => (
// //   <div className="bg-white p-5 rounded-2xl shadow-sm">
// //     <h2 className="font-semibold mb-3">Activity</h2>
// //     <ul className="space-y-3 text-sm">
// //       <li className="p-2 bg-gray-50 rounded">Booking approved</li>
// //       <li className="p-2 bg-gray-50 rounded">New member added</li>
// //     </ul>
// //   </div>
// // );

// // const SettingsPage = () => <div className="text-gray-600">Settings coming soon...</div>;

// // const Layout = ({ children }) => (
// //   <div>
// //     <Sidebar />
// //     <Navbar />
// //     <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">{children}</main>
// //   </div>
// // );

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Layout><Dashboard /></Layout>} />
// //         <Route path="/members" element={<Layout><Members /></Layout>} />
// //         <Route path="/resources" element={<Layout><Resources /></Layout>} />
// //         <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
// //         <Route path="/activity" element={<Layout><ActivityPage /></Layout>} />
// //         <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // const style = document.createElement("style");
// // style.innerHTML = `
// // .btn { @apply px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-sm; }
// // .btn-outline { @apply px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition; }
// // .badge-blue { @apply bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-xs; }
// // .badge-green { @apply bg-green-100 text-green-600 px-2 py-1 rounded-lg text-xs; }
// // `;
// // document.head.appendChild(style);
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 text-white">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          
          
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}