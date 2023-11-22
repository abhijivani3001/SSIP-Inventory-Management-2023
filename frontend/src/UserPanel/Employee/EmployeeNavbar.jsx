import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const EmployeeNavbar = () => {
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
          <li>
            <div className='navbar-element-parent group'>
              <Link
                to='/add-products-emp'
                className={`${
                  location.pathname === '/add-products-emp'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Add Products
              </Link>
              <div
                className={`${
                  location.pathname === '/add-products-emp'
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

export default EmployeeNavbar;
