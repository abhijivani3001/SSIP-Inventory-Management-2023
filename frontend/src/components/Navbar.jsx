import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import cart from '../resources/shopping-cart.png';
import notification from '../resources/notification.png';
import { useLocation } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import axios from '../AxiosUrl';

// const USER_TYPES = {
//   EMPLOYEE: 'employee',
//   DEP_STORE_MANAGER: 'department store manager',
//   HOD: 'hod',
// };

// const CURRENT_USER_TYPES = USER_TYPES.EMPLOYEE;

const Navbar = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [username, setUsername] = useState('');

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  useEffect(() => {
    axios
      .get('api/user')
      .then((response) => {
        setUsername(response.data.user.name);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <nav className='px-6 py-4 flex justify-between items-center text-gray-900'>
      <div>
        <Link to='/' className='text-4xl ml-2 font-semibold'>
          Inventory Management
        </Link>
      </div>
      <ul className='flex space-x-16 mr-6 align-middle'>
        <div className='flex space-x-6  justify-items-start text-lg'>
          <li>
            <Link
              to='/'
              className={`hover:underline ${location.pathname === '/' ? 'navbar-title' : ''
                }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className={`hover:underline ${location.pathname === '/about' ? 'navbar-title' : ''
                }`}
            >
              About
            </Link>
          </li>

          {/*  */}
          {isLoggedIn && (
            <li>
              <Link
                to='/products'
                className={`hover:underline ${location.pathname === '/products' ? 'navbar-title' : ''
                  }`}
              >
                Products
              </Link>
            </li>
          )}

          <li>
            <Link
              to='/order-list'
              className={`hover:underline ${location.pathname === '/order-list' ? 'navbar-title' : ''
                }`}
            >
              Order List
            </Link>
          </li>
          <li>
            <Link
              to='/placed-order-list'
              className={`hover:underline ${location.pathname === '/placed-order-list' ? 'navbar-title' : ''
                }`}
            >
              Placed order
            </Link>
          </li>
        </div>

        <div className='ml-auto flex space-x-4'>
          <li className='my-auto'>
            <Link to='/cart'>
              <img src={cart} alt='Cart' className='w-6' />
            </Link>
          </li>
          <li className='my-auto'>
            <Link to='/notification'>
              <img src={notification} alt='Cart' className=' w-6' />
            </Link>
          </li>

          {/* login */}
          {!isLoggedIn && (
            <li>
              <Link
                to='/login'
                className={`hover:underline text-lg my-auto ${location.pathname === '/login' ? 'navbar-title' : ''
                  }`}
              >
                Login
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link
                to='/user'
                className={`hover:underline text-xl my-auto ${location.pathname === '/user' ? 'navbar-title' : ''
                  }`}
              >
                {username}
              </Link>
            </li>
          )}

          {/* logout */}
          {isLoggedIn && (
            <li>
              <Link
                to='/'
                className={`hover:underline text-xl my-auto ${location.pathname === '/*' ? 'navbar-title' : ''
                  }`}
              >
                <button onClick={logoutHandler}>Logout</button>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;