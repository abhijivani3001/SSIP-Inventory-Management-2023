import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import cartImg from '../../resources/shopping-cart.png';
import notificationImg from '../../resources/notification.png';
import userImg from '../../resources/user.png';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';

const Navbar = () => {
  const USER = {
    EMPLOYEE: 'employee',
    SUB_BRANCH_STORE_MANAGER: 'sub-branch-store-manager',
    SUB_BRANCH_HEAD: 'sub-branch-head',
    BRANCH_STORE_MANAGER: 'branch-store-manager',
    BRANCH_HEAD: 'branch-head',
    DEPARTMENT_STORE_MANAGER: 'department-store-manager',
    DEPARTMENT_HEAD: 'department-head',
    ADMIN: 'admin',
  };

  const dropdown = document.getElementById('user-dropdown');
  const navbarUser = document.getElementById('navbar-user');

  const toggleDropdown = () => {
    dropdown.classList.toggle('hidden');
  };
  const toggleNavbarUser = () => {
    navbarUser.classList.toggle('hidden');
  };

  const location = useLocation();
  const { cart, dispatch } = useCart();

  const [amount, setAmount] = useState(cart.items.length || 0);

  useEffect(() => {
    setAmount(cart.items.length);
  }, [cart]);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // const token = authCtx.token;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        console.log(data);
        setUsername(data.name);
        setEmail(data.email);
        setUserRole(data.role);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <nav className='sticky inset-x-0 top-0 z-10 text-gray-900 bg-gray-100'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-4 px-8'>
        {/* <div className='text-4xl ml-2 font-semibold'> */}

        {/* part-1 */}
        <Link to='/'>
          <div className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8 mr-3'
              alt='Flowbite Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
              Inventory
            </span>
          </div>
        </Link>

        {/* part-2 */}
        <div className='order-last flex gap-4'>
          {/* <div>notification</div> */}
          <ul className='flex align-middle gap-4'>
            {!isLoggedIn && (
              <li>
                <Link
                  to='/login'
                  className={`navbar-element ${
                    location.pathname === '/login'
                      ? 'active-navbar-element'
                      : ''
                  }`}
                >
                  Login
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className='my-auto'>
                <Link to='/cart'>
                  <div className='flex gap-0'>
                    <div className='w-6 relative'>
                      <img src={cartImg} alt='Cart' />
                      <span className='absolute left-3 bottom-3 bg-teal-700 text-white py-0 px-2 rounded-full z-30'>
                        {amount}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className='my-auto'>
                <Link to='/notification'>
                  <img src={notificationImg} alt='Cart' className='w-6' />
                </Link>
              </li>
            )}
          </ul>

          {/* user profile dropdown */}
          {isLoggedIn && (
            <div className='flex items justify-start flex-col '>
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
                  <span className='block text-sm text-gray-900'>
                    {username}
                  </span>
                  <span className='block text-sm  text-gray-500 truncate'>
                    {email}
                  </span>
                </div>
                <ul className='py-2' aria-labelledby='user-menu-button'>
                  <li>
                    <Link
                      to='/user'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
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
          )}
        </div>

        {/* part-3 */}
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-user'
        >
          <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
            <li>
              <Link
                to='/'
                className={`${
                  location.pathname === '/'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className={`${
                  location.pathname === '/about'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                About
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to='/products'
                  className={`${
                    location.pathname === '/products'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Products
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === USER.SUB_BRANCH_STORE_MANAGER && (
              <li>
                <Link
                  to='/requested-order-list'
                  className={`${
                    location.pathname === '/requested-order-list'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Requested orders
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === USER.SUB_BRANCH_HEAD && (
              <li>
                <Link
                  to='/requested-order-list-sub-head'
                  className={`${
                    location.pathname === '/requested-order-list-sub-head'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Requested orders
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to='/placed-order-list'
                  className={`${
                    location.pathname === '/placed-order-list'
                      ? 'active-navbar-element'
                      : 'navbar-element'
                  }`}
                >
                  Placed orders
                </Link>
              </li>
            )}
            {isLoggedIn &&
              (userRole === USER.SUB_BRANCH_STORE_MANAGER ||
                userRole === USER.BRANCH_STORE_MANAGER ||
                userRole === USER.DEPARTMENT_STORE_MANAGER) && (
                <li>
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
                </li>
              )}
          </ul>
        </div>
      </div>
      <div className='border border-gray-400 mx-8'></div>
    </nav>
  );
};

export default Navbar;
