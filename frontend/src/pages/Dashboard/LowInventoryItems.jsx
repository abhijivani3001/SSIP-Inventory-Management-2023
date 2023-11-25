import React, { useState } from 'react';

const LowInventoryItems = (props) => {
  const [index, setIndex] = useState(1);

  return (
    <>
      {!props.lowStock?.length && (
        <>
          <div className='text-lg text-center mb-6 font-semibold text-gray-700 uppercase'>
            No more List of items low in quantity
          </div>
        </>
      )}
      {props.lowStock?.length && (
        <>
          <div className='text-lg text-center mb-6 font-semibold text-gray-700 uppercase'>
            List of items low in quantity
          </div>

          <div className='relative overflow-x-auto shadow-sm border'>
            <table className='w-full divide-y text-left text-gray-500'>
              <thead className='text-base text-gray-700 uppercase bg-slate-100'>
                <tr className='divide-x'>
                  <th scope='col' className='px-6 py-1 w-40'>
                    Sr. no
                  </th>
                  <th scope='col' className='px-6 py-1 w-[24rem]'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-1 w-[24rem]'>
                    Available Quantity
                  </th>
                  <th scope='col' className='px-6 py-1 w-[24rem]'>
                    Buffer Limit
                  </th>
                  <th scope='col' className='px-6 py-1 w-[42rem]'>
                    Low Qty Alert Limit (20%)
                  </th>
                  <th scope='col' className='px-6 py-1 w-[24rem]'>
                    Max Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.lowStock?.map((item, arrayIndex) => {
                  const currentIndex = index + arrayIndex;
                  const min = (item.minValue * 20) / 100 + item.minValue;

                  return (
                    <tr className='bg-white text-gray-900 text-base hover:bg-gray-50 border-b divide-x font-medium'>
                      <td className='px-6 py-2'>{currentIndex}.</td>
                      <td className='px-6 py-2'>{item.name}</td>
                      <td className='px-6 py-2'>{item.quantity}</td>
                      <td className='px-6 py-2'>{item.minValue}</td>
                      {/* <td className='px-6 py-2'>{item.minValue} + 20%({item.minValue}) = {min}</td> */}
                      <td className='px-6 py-2'>{min}</td>
                      <td className='px-6 py-2'>{item.maxValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default LowInventoryItems;
