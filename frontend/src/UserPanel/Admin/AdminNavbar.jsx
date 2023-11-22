import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <>
      {/* part-2: main elements */}
      <div
        className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1 h-full'
        id='navbar-user'
      >
        <ul className='flex font-medium text-lg p-0 m-0 h-full align-middle rounded-lg'>
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/add-products'
                className={`${
                  location.pathname === '/add-products'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Add Products</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/add-products'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>

          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/register-user'
                className={`${
                  location.pathname === '/register-user'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Register User</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/register-user'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>

          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/'
                className={`${
                  location.pathname === '/'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Dashboard</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>

          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/reset-password'
                className={`${
                  location.pathname === '/reset-password'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Reset Password</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/reset-password'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
