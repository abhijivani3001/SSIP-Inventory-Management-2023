import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import Button from '../components/UI/Button';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  // Function to add items to the cart
  const addToCart = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Cart Items</h1>
      </div>

      <div className='my-6'>
        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </div>

      <div className='text-center'>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default CartItems;
