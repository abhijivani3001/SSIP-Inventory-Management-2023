import React, { useState } from 'react';
import Button from './UI/Button';

const CartItem = (props) => {
  const [freq,setFreq]=useState(props.value);
  const incrementHandler=()=>{
    setFreq((prev)=>prev+1)
  }
  const decrementHandler=()=>{
    if(freq>1) setFreq((prev)=>prev-1)
  }

  return (
    <>
      <div className='border-2 flex justify-between border-gray-300 rounded-lg my-2'>
        <div className='flex gap-4'>
          <img
            className='p-2 h-16'
            src='https://flowbite.com/docs/images/products/apple-watch.png'
            alt='product image'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            Apple Watch Series 7 GPS
          </h5>
        </div>

        <div className='flex my-auto gap-2 mr-8'>
          <Button onClick={decrementHandler}>-</Button>
          <div className='my-auto'>{freq}</div>
          <Button onClick={incrementHandler}>+</Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
