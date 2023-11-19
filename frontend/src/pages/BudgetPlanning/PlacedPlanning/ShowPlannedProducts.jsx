import React, { useState } from 'react';

const ShowPlannedProducts = (props) => {
  return (
    <>
      <tr
        className={`bg-white text-gray-700 hover:bg-gray-100 border-b divide-x divide-slate-500`}
      >
        <th className='px-6'>{props.index}</th>
        <td scope='row' className='flex items-center py-1 whitespace-nowrap'>
          <div className='text-base font-semibold flex gap-2'>
            <div>
              <img
                className='p-2 h-16 w-24 object-contain'
                src={props.imageUrl}
                alt='productimage'
              />
            </div>
            <div className='my-auto'>{props.name}</div>
          </div>
        </td>

        <td className='px-6'>$5</td>
        <td className='px-6'>{props.quantity}</td>

        <td className='px-6'>total price</td>
        <td className='px-6'>details</td>
        <td className='px-6'>delete</td>
      </tr>
    </>
  );
};

export default ShowPlannedProducts;
