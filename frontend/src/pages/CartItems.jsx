import React, { useState } from 'react';
import CartItem from '../components/CartItem';

const CartItems = () => {
  const [value, setValue] = useState(12);
  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Cart Items</h1>
      </div>

      <div className='my-6'>
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
        <CartItem value={value} />
      </div>

      <table className='mr-auto'>
        {value.map((value, index) => (
          <tr key={index}>
            <td>
              <img
                className='p-8 rounded-t-lg h-40 m-auto'
                src='https://flowbite.com/docs/images/products/apple-watch.png'
                alt='product image'
              />
            </td>
            <td>
              <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
                Apple Watch Series 7 GPS
              </h5>
            </td>
            <td>
              <div className='flex gap-3 mr-[-2000px] items-center justify-center my-2 mb-0'>
                <button
                  onClick={() => handleDecrease(index)}
                  className='px-4 py-2 border border-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 '
                >
                  -
                </button>
                <div className='text-3xl'>{value}</div>
                <button
                  onClick={() => handleIncrease(index)}
                  className='px-4 py-2 border border-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300'
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <div className="flex items-center justify-center">
        <button className='text-4xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full'>Submit</button>
      </div>
    </div >
  );
};

export default CartItems;
