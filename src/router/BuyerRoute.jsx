import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loading/Loader';

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);  // Make sure useBuyer is working as expected
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loader />;
  }

  if (user && isBuyer) {
    return children;  // Allow access if the user is a buyer
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default BuyerRoute;
