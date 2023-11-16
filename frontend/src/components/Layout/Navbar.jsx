import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import axios from '../../api/AxiosUrl';
import ROLES from '../../constants/ROLES';

import cartImg from '../../resources/shopping-cart.png';
import notificationImg from '../../resources/notification.png';

import EmployeeNavbar from '../../UserPanel/Employee/EmployeeNavbar';
import HeadNavbar from '../../UserPanel/Head/HeadNavbar';
import StoreManagerNavbar from '../../UserPanel/StoreManager/StoreManagerNavbar';
import AdminNavbar from '../../UserPanel/Admin/AdminNavbar';

import userImg from '../../resources/user.png';
import { useCart } from '../../store/CartProvider';

const Navbar = () => {
  // Auth:
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const location = useLocation();

  // Cart:
  const { cart, dispatch } = useCart();
  const [amount, setAmount] = useState(cart.items.length || 0);
  useEffect(() => {
    setAmount(cart.items.length);
  }, [cart]);

  // User Data:
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const name = userData?.name;
  const email = userData?.email;

  // user profile dropdown:
  const dropdown = document.getElementById('user-dropdown');
  const navbarUser = document.getElementById('navbar-user');
  const toggleDropdown = () => {
    dropdown?.classList.toggle('hidden');
  };
  const toggleNavbarUser = () => {
    navbarUser?.classList.toggle('hidden');
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  // Notifications:
  const [isNewNotification, setIsNewNotification] = useState(false);
  console.log(cart.isNotificationUpdated);

  const getNotifications = async () => {
    try {
      const res = await axios.get('/api/notification');
      res.data.notifications.map((notification) => {
        // if (notification.isSeen === false) setIsNewNotification(true);
        if (notification.isSeen === false)
          dispatch({ type: 'NOTIFICATION', payload: true });
      });

      if (cart.isNotificationUpdated) setIsNewNotification(true);
      else setIsNewNotification(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [cart.isNotificationUpdated]);

  return (
    <nav className='sticky inset-x-0 top-0 z-10 text-gray-900 bg-gray-100 text-xl mx-2'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-4 px-10'>
        {/* Part-1: logo */}
        <Link to='/dashboard'>
          <div className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8 mr-3'
              alt='Flowbite Logo'
            />
            <span className='self-center text-2xl font-bold whitespace-nowrap'>
              Inventory Management
            </span>
          </div>
        </Link>

        {/* login */}
        {!isLoggedIn && (
          <div className='order-last flex gap-4'>
            <ul className='flex align-middle gap-4'>
              <li>
                <Link
                  to='/login'
                  className={`navbar-element ${
                    location.pathname === '/login' || location.pathname === '/'
                      ? 'active-navbar-element'
                      : ''
                  }`}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Part-3: cart, notification, user profile */}
        {!isLoading && isLoggedIn && (
          <div className='flex gap-4 order-last'>
            {userData?.role !== ROLES.ADMIN && (
              <ul className='flex align-middle gap-4'>
                {/* cart */}
                <li className='my-auto'>
                  <Link to='/cart'>
                    <div className='flex gap-0'>
                      <div className='w-6 relative'>
                        <img src={cartImg} alt='Cart' />
                        <span className='absolute left-3 bottom-3 bg-teal-700 text-white py-0 px-1.5 text-sm rounded-full z-30'>
                          {amount}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>

                {/* notification */}
                <li className='my-auto'>
                  <Link to='/notification'>
                    <div className='flex gap-0'>
                      <div className='w-6 relative'>
                        <img src={notificationImg} alt='Cart' className='w-6' />
                        {isNewNotification && (
                          <span className='absolute left-3 bottom-3 bg-rose-700 h-3 w-3 rounded-full z-30'></span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            )}

            {/* user profile */}
            <div className='flex items justify-start flex-col order-last'>
              <button
                type='button'
                className='flex mr-3 text-sm rounded-full md:mr-0 hover:ring-4 hover:ring-gray-300 '
                id='user-menu-button'
                aria-expanded='false'
                data-dropdown-toggle='user-dropdown'
                data-dropdown-placement='bottom'
                onClick={toggleDropdown}
              >
                <span className='sr-only'>Open user menu</span>
                <img
                  className='w-7 h-7 rounded-full'
                  src={userImg}
                  alt='user photo'
                />
              </button>
              <div
                className='z-50 my-8 hidden overflow-hidden right-8 absolute text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow-lg'
                id='user-dropdown'
              >
                <div className='px-4 py-3'>
                  <span className='block text-sm text-gray-900'>{name}</span>
                  <span className='block text-sm  text-gray-500 truncate'>
                    {email}
                  </span>
                </div>
                <ul className='py-2' aria-labelledby='user-menu-button'>
                  <li>
                    <Link
                      to='/user'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={toggleDropdown}
                    >
                      Your profile
                    </Link>
                  </li>
                  {userData?.role !== ROLES.ADMIN && (
                    <li>
                      <Link
                        to='/dashboard'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        onClick={toggleDropdown}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {userData?.role === ROLES.ADMIN && (
                    <li>
                      <Link
                        to='/dashboard'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        onClick={toggleDropdown}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={toggleDropdown}
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={logoutHandler}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
              <button
                onClick={toggleNavbarUser}
                data-collapse-toggle='navbar-user'
                type='button'
                className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                aria-controls='navbar-user'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 14'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 1h15M1 7h15M1 13h15'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Part-2: */}
        {!isLoading && isLoggedIn && userData?.role === ROLES.ADMIN && (
          <AdminNavbar />
        )}

        {!isLoading &&
          isLoggedIn &&
          (userData?.role === ROLES.SUB_BRANCH_HEAD ||
            userData?.role === ROLES.BRANCH_HEAD ||
            userData?.role === ROLES.DEPARTMENT_HEAD) && <HeadNavbar />}

        {!isLoading &&
          isLoggedIn &&
          (userData?.role === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userData?.role === ROLES.BRANCH_STORE_MANAGER ||
            userData?.role === ROLES.DEPARTMENT_STORE_MANAGER) && (
            <StoreManagerNavbar />
          )}

        {!isLoading && isLoggedIn && userData?.role === ROLES.EMPLOYEE && (
          <EmployeeNavbar />
        )}
      </div>

      {/* horizontal-line */}
      <div className='border border-gray-400 mx-8'></div>
    </nav>
  );
};

export default Navbar;
