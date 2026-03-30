import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect logic when user accesses unauthorized path
    const fallbackPath = user.role === 'SUPER_ADMIN' ? '/super-admin/dashboard' :
                         user.role === 'PRINCIPAL' ? '/principal/dashboard' :
                         '/student/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
