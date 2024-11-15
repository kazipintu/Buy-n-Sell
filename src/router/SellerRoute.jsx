import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useSeller from '../hooks/useSeller';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loading/Loader';

const SellerRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email)

  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loader />;
  }

  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />
};

export default SellerRoute;