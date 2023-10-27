import React, { useState } from 'react';
import image from '../resources/left-arrow.png';

const CartItem = () => {
  const [values, setValues] = useState([12, 20, 25, 49]); // Initial values for each row

  const handleDecrease = (index) => {
    const updatedValues = [...values];
    updatedValues[index] = Math.max(updatedValues[index] - 1, 0);
    setValues(updatedValues);
  };

  const handleIncrease = (index) => {
    const updatedValues = [...values];
    updatedValues[index] += 1;
    setValues(updatedValues);
  };

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex ml-10'>
        <img src={image} alt="arrow" className='mr-2 w-12 h-12 mt-3' />
        <h1 className='text-6xl font-bold tracking-tight text-gray-900'>Cart Items</h1>
      </div>

      <table className='mr-auto'>
        {values.map((value, index) => (
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
      <div className="inline-block flex items-center justify-center">
  <button className='text-4xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full'>Submit</button>
</div>


    </div>
  );
};

export default CartItem;
