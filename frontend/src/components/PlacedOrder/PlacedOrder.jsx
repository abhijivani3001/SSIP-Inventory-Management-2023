import React from 'react';

const PlacedOrder = (props) => {
  return (
    <>
      <div className='border-2 flex justify-between border-gray-300 bg-white rounded-lg mb-2 mx-6'>
        <div className='flex gap-4'>
          <img
            className='p-4 h-20'
            src='https://flowbite.com/docs/images/products/apple-watch.png'
            alt='productimage'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            {props.name}
          </h5>
        </div>

        <div className='flex my-auto gap-14 mr-8'>
          <div className='mr-10'>{props.quantity}</div>
          <div className='mr-2'>{props.delivered}</div>
          <div>{props.status}</div>
        </div>
      </div>
    </>
  );
};

export default PlacedOrder;
