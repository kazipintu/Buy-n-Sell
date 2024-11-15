import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Categories from '../components/Home/Categories/Categories';
import Furnitures from '../components/Home/Categories/Furnitures';
import Scooters from '../components/Home/Categories/Scooters';
import Appliances from '../components/Home/Categories/Appliances';
import Contact from '../components/Contact/Contact';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import UserRoute from './UserRoute';
import DashboardLayout from '../Layout/DashboardLayout';
import MyOrders from '../components/Dashboard/MyOrders/MyOrders';
import AddProduct from '../components/Dashboard/AddProduct/AddProduct';
import MyProducts from '../components/Dashboard/MyProducts/MyProducts';
import AllSellers from '../components/Dashboard/AllSellers/AllSellers';
import AllBuyers from '../components/Dashboard/AllBuyers/AllBuyers';
import NotFound from '../components/NotFound/NotFound';
import AdminRoute from './AdminRoute';
import SellerRoute from './SellerRoute';
import BuyerRoute from './BuyerRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/furnitures",
        element: <UserRoute><Furnitures /></UserRoute>,
      },
      {
        path: "/scooters",
        element: <UserRoute><Scooters /></UserRoute>,
      },
      {
        path: "/appliances",
        element: <UserRoute><Appliances /></UserRoute>,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <UserRoute><DashboardLayout /></UserRoute>,
    children: [
      {
        path: "/dashboard/my-orders",
        element: <BuyerRoute>
          <MyOrders />
        </BuyerRoute>
      },
      {
        path: "/dashboard/add-product",
        element: <SellerRoute>
          <AddProduct />
        </SellerRoute>
      },
      {
        path: "/dashboard/my-products",
        element: <SellerRoute>
          <MyProducts />
        </SellerRoute>
      },
      {
        path: "/dashboard/all-sellers",
        element: <AdminRoute>
          <AllSellers />
        </AdminRoute>
      },
      {
        path: "/dashboard/all-buyers",
        element: <AdminRoute>
          <AllBuyers />
        </AdminRoute>
      },
    ]
  },
  // Add the catch-all route for 404 not found
  {
    path: "*",  // This wildcard matches any undefined route
    element: <NotFound />  // Show the NotFound page
  }
]);

export default router;
