import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';
import ROLES from '../../constants/ROLES';
import { useLocation } from 'react-router-dom';

const StoreManagerNavbar = () => {
  const location = useLocation();

  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('api/user');
        setCurrentUserRole(res.data.user.role);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

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
          {currentUserRole === ROLES.SUB_BRANCH_STORE_MANAGER && (
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
          )}
          {currentUserRole === ROLES.DEPARTMENT_STORE_MANAGER && (
            <li>
              <div className='navbar-element-parent group'>
                <Link
                  to='/dsm-emp-orders'
                  className={`${
                    location.pathname === '/dsm-emp-orders'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Emp-orders
                </Link>
                <div
                  className={`${
                    location.pathname === '/dsm-emp-orders'
                      ? 'active-navbar-underline'
                      : 'navbar-underline'
                  } `}
                ></div>
              </div>
            </li>
          )}
          {currentUserRole === ROLES.DEPARTMENT_STORE_MANAGER && (
            <li>
              <div className='navbar-element-parent group'>
                <Link
                  to='/item-requests'
                  className={`${
                    location.pathname === '/item-requests'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Item Requests
                </Link>
                <div
                  className={`${
                    location.pathname === '/item-requests'
                      ? 'active-navbar-underline'
                      : 'navbar-underline'
                  } `}
                ></div>
              </div>
            </li>
          )}
          {currentUserRole === ROLES.BRANCH_STORE_MANAGER && (
            <li>
              <div className='navbar-element-parent group'>
                <Link
                  to='/bsm-emp-orders'
                  className={`${
                    location.pathname === '/bsm-emp-orders'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Emp-Orders
                </Link>
                <div
                  className={`${
                    location.pathname === '/bsm-emp-orders'
                      ? 'active-navbar-underline'
                      : 'navbar-underline'
                  } `}
                ></div>
              </div>
            </li>
          )}

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
