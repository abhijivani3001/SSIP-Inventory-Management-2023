import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import cartImg from '../../resources/shopping-cart.png';
import notificationImg from '../../resources/notification.png';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../store/CartProvider';

const HeadNavbar = (props) => {
  const location = useLocation();
  const { cart, dispatch } = useCart();

  const [amount, setAmount] = useState(cart.items.length || 0);

  useEffect(() => {
    setAmount(cart.items.length);
  }, [cart]);

  return (
    <>
      {/* part-3: cart, notification */}
      <div className='order-3 flex gap-4'>
        <ul className='flex align-middle gap-4'>
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

          <li className='my-auto'>
            <Link to='/notification'>
              <img src={notificationImg} alt='Cart' className='w-6' />
            </Link>
          </li>
        </ul>
      </div>

      {/* part-2: main elements */}
      <div
        className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
        id='navbar-user'
      >
        <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
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
          <li>
            <Link
              to='/head-requested-orders'
              className={`${
                location.pathname === '/head-requested-orders'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Requested orders
            </Link>
          </li>
          <li>
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
          </li>
          <li>
            <Link
              to='/dashboard'
              className={`${
                location.pathname === '/dashboard' || location.pathname === '/'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeadNavbar;
