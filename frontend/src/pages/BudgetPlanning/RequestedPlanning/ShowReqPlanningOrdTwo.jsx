import React from 'react';

const ShowReqPlanningOrdTwo = (props) => {
  return (
    <>
      <tr className='bg-white text-gray-700 text-base hover:bg-gray-50 border-b divide-x'>
        <th
          scope='row'
          className='flex items-center px-4 py-1 whitespace-nowrap'
        >
          <div className='font-semibold flex items-center gap-2'>
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

        <td className='px-6'>{props.price}</td>
        <td className='px-6'>{props.quantity}</td>
        <td className='px-6'>{props.price * props.quantity}</td>
      </tr>
    </>
  );
};

export default ShowReqPlanningOrdTwo;
