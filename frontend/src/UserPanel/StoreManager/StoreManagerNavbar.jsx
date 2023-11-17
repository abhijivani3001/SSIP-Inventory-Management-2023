import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const StoreManagerNavbar = () => {
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
              to='/products'
              className={`${location.pathname === '/products'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to='/store-manager-requested-orders'
              className={`${location.pathname === '/store-manager-requested-orders'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Requested orders
            </Link>
          </li>
          <li>
            <Link
              to='/placed-orders'
              className={`${location.pathname === '/placed-orders'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Placed orders
            </Link>
          </li>
          <li>
            <Link
              to='/inventory'
              className={`${location.pathname === '/inventory'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to='/sbsm-emp-orders'
              className={`${location.pathname === '/sbsm-emp-orders'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Emp-orders
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard'
              className={`${location.pathname === '/dashboard' || location.pathname === '/'
                ? 'active-navbar-element'
                : 'navbar-element'
                }`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StoreManagerNavbar;
