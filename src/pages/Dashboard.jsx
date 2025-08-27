import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Home from '../components/dashboard/Home';
import Courses from '../components/dashboard/Courses';
import Websites from '../components/dashboard/Websites';
import Users from '../components/dashboard/Users';
import Communication from '../components/dashboard/Communication';
import Search from '../components/dashboard/Search';
import Settings from '../components/dashboard/Settings';

import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/websites/*" element={<Websites />} />
              <Route path="/users" element={<Users />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Floating Help Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 group"
        initial="initial"
        whileHover="hover"
      >
        <button
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 ease-in-out"
        >
          <HelpCircle className="h-6 w-6" />
          <motion.span
            variants={{
              initial: { width: 0, opacity: 0, marginLeft: 0 },
              hover: { width: 'auto', opacity: 1, marginLeft: '0.75rem' }
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap font-semibold"
          >
            Help & Support
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
