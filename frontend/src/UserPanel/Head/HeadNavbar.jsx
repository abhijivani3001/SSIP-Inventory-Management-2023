import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const HeadNavbar = () => {
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
                to='/head-requested-orders'
                className={`${
                  location.pathname === '/head-requested-orders'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Requested Orders</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/head-requested-orders'
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
                <div>Placed Orders</div>
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
                to='/emp-orders'
                className={`${
                  location.pathname === '/emp-orders'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                <div>Emp Orders</div>
              </Link>
              <div
                className={`${
                  location.pathname === '/emp-orders'
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
        </ul>
      </div>
    </>
  );
};

export default HeadNavbar;
