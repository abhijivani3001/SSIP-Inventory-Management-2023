import React, { useState } from 'react';
import Button from '../UI/Button';
import { useCart } from '../../store/CartProvider';

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);
  const { cart, dispatch } = useCart();

  const incrementHandler = (item) => {
    setAmount((prev) => prev + 1);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { ...item, amount: Math.max(0, item.amount + 1) },
    });
  };
  const decrementHandler = (item) => {
    console.log(item);
    if (amount > 1) setAmount((prev) => prev - 1);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { ...item, amount: Math.max(0, item.amount - 1) },
    });
  };

  return (
    <>
      <div className='border-2 flex justify-between border-gray-300 bg-white rounded-lg my-2'>
        <div className='flex gap-4'>
          <img
            className='p-2 h-16'
            src='https://flowbite.com/docs/images/products/apple-watch.png'
            alt='product image'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            {props.name}
          </h5>
        </div>

        <div className='flex my-auto gap-2 mr-8'>
          <Button onClick={() => props.onRemoveFromCart(props.item)}>
            Delete
          </Button>
          <Button onClick={() => decrementHandler(props.item)}>-</Button>
          <div className='my-auto'>{amount}</div>
          <Button onClick={() => incrementHandler(props.item)}>+</Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
