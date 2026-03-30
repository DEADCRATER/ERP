import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';

const MainLayout = () => {
  const { user } = useAuth();

  // Hide sidebar entirely for students as per user request
  const hideSidebar = user?.role === 'STUDENT';

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Top Fixed Header Node */}
      <div className="shrink-0 w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 w-full">
        {/* Pinned Left Sidebar - Hidden for all students */}
        {user && !hideSidebar && <Sidebar />}
        
        {/* Dynamic Inner Scrolling Dashboard Area */}
        <main className={`flex-1 overflow-y-auto relative ${hideSidebar ? 'p-0' : 'p-4 sm:p-6 lg:p-10'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
