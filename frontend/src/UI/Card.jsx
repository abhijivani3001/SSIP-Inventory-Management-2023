import React from 'react';
import Button from './Button';

const Card = () => {
  return (
    <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4'>
      <img
        className='p-8 rounded-t-lg h-48 m-auto'
        src='https://flowbite.com/docs/images/products/apple-watch.png'
        alt='product image'
      />
      <div class='px-5 pb-5 mt-4'>
        {/* title */}
        <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
          Apple Watch Series 7 GPS
        </h5>

        {/* description */}
        <p className='text-gray-500 text-sm my-2'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
          aliquid?
        </p>

        <div class='flex flex-col gap-4 items-center justify-between my-2 mb-0'>
          <div className='flex justify-evenly gap-2'>
            <Button>-</Button>
            <input type='number' className='border-2 border-gray-700 w-20 rounded-lg' />
            <Button>+</Button>
          </div>
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
