import React, { useState } from 'react';
import backButton from '../resources/back-button.png';
import CartItem from '../components/CartItem';

const CartItems = () => {
  const [value, setValue] = useState(12);
  return (
    <div className='flex flex-col mt-4'>
      <div className='flex ml-10'>
        <img src={backButton} alt="arrow" className='mr-9 w-12 h-12 mt-3' />
        <h1 className='text-5xl font-light tracking-tight text-gray-900'>Cart Items</h1>
        <div className='mx-8 mt-4'>
          <div>
        <h1 className='text-6xl font-light'>Cart Items</h1>
          </div>
      
      <div className='my-6'>
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
      </div>
    </div>

    </div>
    </div>
    
  );
};

export default CartItems;

















