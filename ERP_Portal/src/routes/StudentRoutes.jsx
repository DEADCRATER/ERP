import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Dashboard from '../pages/student/Dashboard';
import Profile from '../pages/student/Profile';
import Settings from '../pages/student/Settings';
import Fees from '../pages/student/Fees';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="fees" element={<Fees />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
