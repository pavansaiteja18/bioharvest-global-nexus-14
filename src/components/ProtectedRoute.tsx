
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'farmer' | 'operator' | 'admin' | null>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles = ['farmer', 'operator', 'admin', null]  // Include admin and null as valid roles
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user doesn't have the required role, redirect to appropriate page
  if (user && user.role !== null && !allowedRoles.includes(user.role)) {
    if (user.role === 'farmer') {
      return <Navigate to="/farmer" replace />;
    } else if (user.role === 'operator') {
      return <Navigate to="/operator" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
