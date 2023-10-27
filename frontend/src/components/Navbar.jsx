import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import cart from '../resources/shopping-cart.png';
import notification from '../resources/notification.png';
import user from '../resources/user.png';
import { useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();


  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

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
            <Link to='/' className={`hover:underline ${location.pathname === '/' ? 'navbar-title' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' className={`hover:underline ${location.pathname === '/about' ? 'navbar-title' : ''}`}>
              About
            </Link>
          </li>
          <li>
            <Link to='/products' className={`hover:underline ${location.pathname === '/products' ? 'navbar-title' : ''}`}>
              Products
            </Link>
          </li>
          <li>
            <Link to='/order-list' className={`hover:underline ${location.pathname === '/order-list' ? 'navbar-title' : ''}`}>
              Order List
            </Link>
          </li>

        </div>
        <div className='ml-auto flex space-x-4'>
          <li>
            <Link to='/cart'>
              <img src={cart} alt='Cart' className=' w-6' />
            </Link>
          </li>
          <li>
            <Link to='/notification'>
              <img src={notification} alt='Cart' className=' w-6' />
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className={`hover:underline text-lg my-auto ${location.pathname === '/login' ? 'navbar-title' : ''}`}
              onClick={openLoginForm}
            >
              Login
            </Link>
            <Login isOpen={isLoginFormOpen} onClose={closeLoginForm} />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
