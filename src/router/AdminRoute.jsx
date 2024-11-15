import React, { Children, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loading/Loader';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email)

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />
};

export default AdminRoute;