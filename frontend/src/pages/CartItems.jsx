import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/Cart/CartItem';
import Button from '../components/UI/Button';
import { useCart } from '../store/CartProvider';

import axios from '../api/AxiosUrl';

const CartItems = () => {
  const { cart, dispatch } = useCart();
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    setIsCartEmpty(!cart.items.length);
  }, [cart]);
  // console.log(isCartEmpty,cart.items);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const postElement = async (val) => {
    try {
      const res = await axios.post('api/order', [{
        itemId: val._id,
        quantity: val.amount,
        delivered: 0,
        status: 'pending',
      }]);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler =  (event) => {
    event.preventDefault();
    console.log(cart);

    cart.items.forEach((val) => {
      postElement(val);
    });
  };

  return (
    <div className='mx-8 mt-4'>
      {isCartEmpty && (
        <div className='text-3xl text-center '>Your cart is empty</div>
      )}

      {/* list */}
      {!isCartEmpty && (
        <div>
          <div>
            <h1 className='text-6xl font-light'>Cart Items</h1>
          </div>
          <div className='my-6'>
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                amount={item.amount}
              />
            ))}
          </div>
          <div className='text-center my-4'>
            <Button onClick={submitHandler}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
