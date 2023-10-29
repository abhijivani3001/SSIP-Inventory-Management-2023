import React, { useContext, useState } from 'react';
import CartItem from '../components/Cart/CartItem';
import Button from '../components/UI/Button';
import { useCart } from '../store/CartProvider';

const CartItems = () => {
  const [value, setValue] = useState(12);
  const { cart, dispatch } = useCart();

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Cart Items</h1>
      </div>

      <div className='my-6'>
        {/* <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} /> */}
        {/* {cartItems} */}
        {cart.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
      <div className='text-center'>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default CartItems;
