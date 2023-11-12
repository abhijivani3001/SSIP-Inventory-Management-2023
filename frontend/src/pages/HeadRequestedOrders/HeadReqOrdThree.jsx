import React from 'react';

const HeadReqOrdThree = (props) => {
  return (
    <>
      <tr class='bg-white border-b divide-x dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <th
          scope='row'
          class='flex items-center px-4 py-1 text-gray-900 whitespace-nowrap dark:text-white'
        >
          <div class='text-base font-semibold flex gap-2'>
            <div>
              <img
                className='p-2 h-16 w-24 object-contain'
                src={props.imageUrl}
                alt='productimage'
              />
            </div>
            <div className='my-auto'>{props.name}</div>
          </div>
        </th>

        <td class='px-6'>{props.quantity}</td>

        <td class='px-6'>
          <div className='flex justify-between'>
            <button className='blue_btn'>Approve</button>
            <button className='trans_red_btn'>Reject</button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default HeadReqOrdThree;
