import React from 'react';

const HeadReqOrdThree = (props) => {
  return (
    <>
      <tr className='bg-white border-b divide-x hover:bg-gray-50'>
        <th
          scope='row'
          className='flex items-center px-4 py-1 text-gray-900 whitespace-nowrap'
        >
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
        </th>

        <td className='px-6'>{props.quantity}</td>

        {/* {props.currentStatus === 'pending' && (
          <td className='px-6'>
            <div className='flex justify-between'>
              <button className='blue_btn'>Approve</button>
              <button className='trans_red_btn'>Reject</button>
            </div>
          </td>
        )} */}
      </tr>
    </>
  );
};

export default HeadReqOrdThree;
