import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const StoreManagerNavbar = () => {
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
                to='/products'
                className={`${
                  location.pathname === '/products'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Products</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/products'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/store-manager-requested-orders'
                className={`${
                  location.pathname === '/store-manager-requested-orders'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Requested orders
              </Link>
              <div
                className={`${
                  location.pathname === '/store-manager-requested-orders'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/placed-orders'
                className={`${
                  location.pathname === '/placed-orders'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Placed orders
              </Link>
              <div
                className={`${
                  location.pathname === '/placed-orders'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/inventory'
                className={`${
                  location.pathname === '/inventory'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Inventory
              </Link>
              <div
                className={`${
                  location.pathname === '/inventory'
                    ? 'active-navbar-underline'
                    : 'navbar-underline'
                } `}
              ></div>
            </div>
          </li>
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/sbsm-emp-orders'
                className={`${
                  location.pathname === '/sbsm-emp-orders'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Emp-orders
              </Link>
              <div
                className={`${
                  location.pathname === '/sbsm-emp-orders'
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
                Dashboard
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
        </ul>
      </div>
    </>
  );
};

export default StoreManagerNavbar;
