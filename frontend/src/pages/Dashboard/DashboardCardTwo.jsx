import React, { useState } from 'react';
import DashboardCardThree from './DashboardCardThree';

const DashboardCardTwo = (props) => {
  const [index, setIndex] = useState(1);

  return (
    <>
      <div className='text-2xl mb-6 text-gray-700 font-medium text-center'>
        {props.title}
      </div>
      <div className='relative overflow-x-auto shadow-lg border border-slate-600'>
        <table className='w-full divide-y divide-slate-500 text-sm text-left text-gray-500'>
          <thead className='text-sm text-gray-700 uppercase bg-slate-200'>
            <tr className='divide-x divide-slate-500'>
              <th scope='col' className='px-6 py-2'>
                Sr. no
              </th>
              <th scope='col' className='px-6 py-2'>
                Name
              </th>
              <th scope='col' className='px-6 py-2'>
                Quantity
              </th>
            </tr>
          </thead>

          <tbody>
            {props.orders.map((order, arrayIndex) => {
              const currentIndex = index + arrayIndex;

              return (
                <DashboardCardThree
                  key={order.itemId}
                  imageUrl={order.imageUrl}
                  name={order.name}
                  quantity={order.quantity}
                  index={currentIndex}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardCardTwo;
