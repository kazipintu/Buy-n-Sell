import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const headerNav = (
    <React.Fragment>
      <li><NavLink to={"/"}>Home</NavLink></li>
      <li><NavLink to={"/contact"}>Contact-us</NavLink></li>
      {user?.uid && <li><NavLink to={"/furnitures"}>Furnitures</NavLink></li>}
      {user?.uid && <li><NavLink to={"/scooters"}>Scooters</NavLink></li>}
      {user?.uid && <li><NavLink to={"/appliances"}>Appliances</NavLink></li>}
      {user?.uid && <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>}
      {user?.uid ? (
        <li><NavLink onClick={logOut}>Log-out</NavLink></li>
      ) : (
        <li><NavLink to={"/login"}>Login</NavLink></li>
      )}
    </React.Fragment >
  );

  return (
    <div className='bg-slate-300 fixed left-0 right-0 top-0 z-10'>
      <div className="lg:w-[95%] px-[1%] mx-auto navbar justify-between py-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {headerNav}
            </ul>
          </div>
          <a className="text-left text-xl"><img className='w-1/2 md:w-1/4' src="/assets/favicon.png" alt="" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 px-1">
            {headerNav}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
