import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import Maintenance from '../../pages/shared/Maintenance';

/**
 * @desc    Global Guard to intercept all routes during Maintenance Mode
 * @access  Public
 */
const MaintenanceGuard = ({ children }) => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      try {
        const { data } = await api.get('/super-admin/maintenance');
        setIsMaintenance(data.isMaintenanceMode);
      } catch (err) {
        console.error('Maintenance Check Failed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceStatus();
  }, [location.pathname]); // Re-check on navigation to ensure real-time status

  if (loading) {
    return null; // Silent loader for better UX
  }

  // Conditions to bypass maintenance UI:
  // 1. Maintenance is OFF
  // 2. User is a logged-in Super Admin
  // 3. User is currently on the dedicated Super Admin login page
  const isSuperAdmin = user && user.role === 'SUPER_ADMIN';
  const isAdminLoginPath = location.pathname === '/super-admin-login';

  if (isMaintenance && !isSuperAdmin && !isAdminLoginPath) {
    return <Maintenance />;
  }

  return children;
};

export default MaintenanceGuard;
