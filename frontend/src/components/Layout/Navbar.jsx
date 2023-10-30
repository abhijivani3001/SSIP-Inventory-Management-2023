import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import cartImg from '../../resources/shopping-cart.png';
import notificationImg from '../../resources/notification.png';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import axios from '../../api/AxiosUrl';

const Navbar = () => {
  const location = useLocation();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // const token = authCtx.token;

  const [username, setUsername] = useState('');

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
      <div className='text-4xl ml-2 font-semibold'>
        <Link to='/' >
          Inventory Management
        </Link>
      </div>
      <ul className='flex space-x-16 mr-6 align-middle'>
        <div className='flex space-x-6  justify-items-start text-lg'>
          <li>
            <Link
              to='/'
              className={`hover:underline ${
                location.pathname === '/' ? 'navbar-title' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className={`hover:underline ${
                location.pathname === '/about' ? 'navbar-title' : ''
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
                className={`hover:underline ${
                  location.pathname === '/products' ? 'navbar-title' : ''
                }`}
              >
                Products
              </Link>
            </li>
          )}

          {isLoggedIn && <li>
            <Link
              to='/order-list'
              className={`hover:underline ${
                location.pathname === '/order-list' ? 'navbar-title' : ''
              }`}
            >
              Order List
            </Link>
          </li>}
          {isLoggedIn && <li>
            <Link
              to='/placed-order-list'
              className={`hover:underline ${
                location.pathname === '/placed-order-list' ? 'navbar-title' : ''
              }`}
            >
              Placed order
            </Link>
          </li>}
          {isLoggedIn && <li>
            <Link
              to='/inventory'
              className={`hover:underline ${
                location.pathname === '/inventory' ? 'navbar-title' : ''
              }`}
            >
              Inventory
            </Link>
          </li>}
        </div>

        <div className='ml-auto flex space-x-4'>
          {isLoggedIn && <li className='my-auto'>
            <Link to='/cart'>
              <img src={cartImg} alt='Cart' className='w-6' />
            </Link>
          </li>}
          {isLoggedIn && <li className='my-auto'>
            <Link to='/notification'>
              <img src={notificationImg} alt='Cart' className=' w-6' />
            </Link>
          </li>}

          {/* login */}
          {!isLoggedIn && (
            <li>
              <Link
                to='/login'
                className={`hover:underline text-xl my-auto ${
                  location.pathname === '/login' ? 'navbar-title' : ''
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
                className={`hover:underline text-xl my-auto ${
                  location.pathname === '/user' ? 'navbar-title' : ''
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
                onClick={logoutHandler}
                className='hover:underline text-xl my-auto'
              >
                Logout
              </Link>
            </li>
          )}
          
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;