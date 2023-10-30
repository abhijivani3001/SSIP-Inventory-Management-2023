import React, { useState } from 'react';
import Button from '../UI/Button';

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);

  const incrementHandler = () => {
    setAmount((prev) => prev + 1);
  };
  const decrementHandler = () => {
    setAmount((prev) => prev - 1);
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
          <Button onClick={props.onRemoveFromCart}>Delete</Button>
          <Button onClick={decrementHandler}>-</Button>
          <div className='my-auto'>{amount}</div>
          <Button onClick={incrementHandler}>+</Button>
          {/* <Button onClick={props.onAddToCart}>+</Button> */}
        </div>
      </div>
    </>
  );
};

export default CartItem;
