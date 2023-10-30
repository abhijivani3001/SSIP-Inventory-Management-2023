import React from 'react';
import Button from '../UI/Button';

const PlacedOrder = (props) => {
  return (
    <>
    {props.data.map((val)=>(
      <div className='border-2 flex justify-between border-gray-300 bg-white rounded-lg my-4'>
        <div className='flex gap-4'>
          <img
            className='p-4 h-20'
            src='https://flowbite.com/docs/images/products/apple-watch.png'
            alt='productimage'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            {val.itemId}
          </h5>
        </div>

        <div className='flex my-auto gap-2 mr-8'>
          <div className='mr-12'>{val.quantity}</div>
          <div className='ml-2'>{val.status}</div>
        </div>
      </div>
      ))}
    </>
  );
};

export default PlacedOrder;
