import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const AdminNavbar = (props) => {
  const location = useLocation();

  return (
    <>
      {/* part-2: main elements */}
      <div
        className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
        id='navbar-user'
      >
        <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
          <li>
            <Link
              to='/add-products'
              className={`${
                location.pathname === '/add-products'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Add Products
            </Link>
          </li>
          <li>
            <Link
              to='/register-user'
              className={`${
                location.pathname === '/register-user'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Register User
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard'
              className={`${
                location.pathname === '/dashboard' || location.pathname === '/'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/reset-password'
              className={`${
                location.pathname === '/reset-password'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Reset Password
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
