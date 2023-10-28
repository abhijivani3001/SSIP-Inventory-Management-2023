import React, { useState } from 'react';
import CartItem from '../components/CartItem';

const CartItems = () => {
  const [value, setValue] = useState(12);
  return (
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
  );
};

export default CartItems;