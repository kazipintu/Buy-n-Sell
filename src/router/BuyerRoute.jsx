import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loading/Loader';

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email)

  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loader/>;
  }

  if (user && isBuyer) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />
};

export default BuyerRoute;