import React, { useContext } from 'react';
import Header from '../shared/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';
import Loader from '../shared/Loading/Loader';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  // Handle loading states
  if (isAdminLoading || isSellerLoading || isBuyerLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-[50px] py-[100px] bg-[#F1F5F9]">
          <Outlet />
          <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden"></label>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu text-base-content text-[20px] w-80 pt-[100px]">
            {/* Buyer links */}
            {isBuyer && (
              <>
                <li><Link className="rounded-none py-[15px]" to="/dashboard/my-orders">My Orders</Link></li>
              </>
            )}

            {/* Seller links */}
            {isSeller && (
              <>
                <li><Link className="rounded-none py-[15px]" to="/dashboard/add-product">Add a Product</Link></li>
                <li><Link className="rounded-none py-[15px]" to="/dashboard/my-products">My Products</Link></li>
              </>
            )}

            {/* Admin links */}
            {isAdmin && (
              <>
                <li><Link className="rounded-none py-[15px]" to="/dashboard/all-sellers">All Sellers</Link></li>
                <li><Link className="rounded-none py-[15px]" to="/dashboard/all-buyers">All Buyers</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
