import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loading/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);  // Ensure useAdmin hook is correct
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;  // Allow access if the user is an admin
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
