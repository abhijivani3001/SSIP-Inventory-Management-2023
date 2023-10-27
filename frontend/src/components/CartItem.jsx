import React from 'react';
import Button from '../UI/Button';

const CartItem = (props) => {
  return (
    <div className='border-2 flex justify-between border-gray-300 rounded-lg my-4'>
      <div className='flex gap-4'>
        <img
          className='p-4 h-20'
          src='https://flowbite.com/docs/images/products/apple-watch.png'
          alt='product image'
        />
        <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
          Apple Watch Series 7 GPS
        </h5>
      </div>

      <div className='flex my-auto gap-2 mr-8'>
        <Button>-</Button>
        {props.value}
        <Button>+</Button>
      </div>
    </div>
  );
};

export default CartItem;
