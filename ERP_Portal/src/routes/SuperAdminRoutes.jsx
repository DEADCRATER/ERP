import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';
import ManagePrincipals from '../pages/superadmin/ManagePrincipals';
import ManageStudents from '../pages/superadmin/ManageStudents';
import SuperAdminSettings from '../pages/superadmin/SuperAdminSettings';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="principals" element={<ManagePrincipals />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="settings" element={<SuperAdminSettings />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes;
