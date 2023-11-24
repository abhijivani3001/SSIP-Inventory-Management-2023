import React from 'react';

const DashboardCardThree = (props) => {
  return (
    <>
      <tr
        className={`bg-white text-gray-700 hover:bg-gray-100 border-b divide-x divide-slate-500 text-base`}
      >
        <th className='px-6'>{props.index}</th>
        <td
          scope='row'
          className='flex items-center py-1 px-2 whitespace-nowrap'
        >
          <div className='text-base mx-4 font-semibold flex gap-2 '>
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

        <td className='px-6'>{props.quantity}</td>
      </tr>
    </>
  );
};

export default DashboardCardThree;
