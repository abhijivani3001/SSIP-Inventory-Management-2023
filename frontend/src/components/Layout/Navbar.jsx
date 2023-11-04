import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import axios from '../../api/AxiosUrl';
import ROLES from '../../constants/ROLES';

import EmployeeNavbar from '../../UserPanel/Employee/EmployeeNavbar';
import HeadNavbar from '../../UserPanel/Head/HeadNavbar';
import StoreManagerNavbar from '../../UserPanel/StoreManager/StoreManagerNavbar';
import AdminNavbar from '../../UserPanel/Admin/AdminNavbar';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const location = useLocation();

  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <nav className='sticky inset-x-0 top-0 z-10 text-gray-900 bg-gray-100 text-xl mx-2'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-4 px-10'>

        <Link to='/'>
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

        {!isLoggedIn && (
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-user'
          >
            <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
              <li>
                <Link
                  to='/'
                  className={`${location.pathname === '/'
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
                  className={`${location.pathname === '/about'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                    }`}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}

        {!isLoggedIn && (
          <div className='order-last flex gap-4'>
            <ul className='flex align-middle gap-4'>
              <li>
                <Link
                  to='/login'
                  className={`navbar-element ${location.pathname === '/login'
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

        {!isLoading && isLoggedIn && (userData.role===ROLES.ADMIN) && (
          <AdminNavbar logoutHandler={logoutHandler} />
        )}

        {!isLoading &&
          isLoggedIn &&
          (userData.role === ROLES.SUB_BRANCH_HEAD ||
            userData.role === ROLES.BRANCH_HEAD ||
            userData.role === ROLES.DEPARTMENT_HEAD) && (
            <HeadNavbar
              // userData={userData}
              name={userData.name}
              email={userData.email}
              // branch={userData.branch}
              // subBranch={userData.subBranch}
              // department={userData.department}
              // inventory={userData.inventory} // array
              // orders={userData.orders} // array
              // phone={userData.phone}
              // userId={userData._id}
              logoutHandler={logoutHandler}
            />
          )}

        {!isLoading &&
          isLoggedIn &&
          (userData.role === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userData.role === ROLES.BRANCH_STORE_MANAGER ||
            userData.role === ROLES.DEPARTMENT_STORE_MANAGER) && (
            <StoreManagerNavbar
              // userData={userData}
              name={userData.name}
              email={userData.email}
              // branch={userData.branch}
              // subBranch={userData.subBranch}
              // department={userData.department}
              // inventory={userData.inventory} // array
              // orders={userData.orders} // array
              // phone={userData.phone}
              // userId={userData._id}
              logoutHandler={logoutHandler}
            />
          )}

        {!isLoading && isLoggedIn && userData.role === ROLES.EMPLOYEE && (
          <EmployeeNavbar
            // userData={userData}
            name={userData.name}
            email={userData.email}
            // branch={userData.branch}
            // subBranch={userData.subBranch}
            // department={userData.department}
            // inventory={userData.inventory} // array
            // orders={userData.orders} // array
            // phone={userData.phone}
            // userId={userData._id}
            logoutHandler={logoutHandler}
          />
        )}
      </div>
      <div className='border border-gray-400 mx-8'></div>
    </nav>
  );
};

export default Navbar;
