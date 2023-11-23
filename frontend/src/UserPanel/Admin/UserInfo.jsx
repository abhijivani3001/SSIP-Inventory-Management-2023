import React, { useState } from 'react';
import { Calender, Email, Phone } from '../../icons/icons';
import PlacedBulkOrder from '../../components/PlacedOrder/PlacedBulkOrder';

import multiavatar from '@multiavatar/multiavatar';
import DangerousHTML from 'react-dangerous-html';

const UserInfo = (props) => {
  const userData = props.userData;
  const [isDataShown, setIsDataShown] = useState(false);

  const toggleHandler = () => {
    setIsDataShown((prev) => !prev);
  };

  let svgCode = multiavatar(userData.profileIcon || '66493f858b6dc78b85');

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-24'>
        <div className='flex flex-wrap justify-center bg-slate-100 rounded-t-lg'>
          <div className='w-full px-4 flex justify-center'>
            <div className='w-48 shadow-2xl rounded-full -mt-24'>
              <DangerousHTML html={svgCode} />
            </div>
          </div>
          <div className='w-full px-4 text-center'>
            <div className='flex justify-center align-middle gap-6 py-4'>
              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                  {userData.subBranch}
                </span>
                <span className='text-sm text-slate-400'>Sub Branch</span>
              </div>
              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                  {userData.branch}
                </span>
                <span className='text-sm text-slate-400'>Branch</span>
              </div>
              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                  {userData.department}
                </span>
                <span className='text-sm text-slate-400'>Department</span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mt-8 px-6'>
          <h3 className='text-3xl font-semibold leading-normal mb-4 text-slate-700'>
            {userData.name}
            <span className='text-gray-400 text-2xl'> ({userData.role})</span>
          </h3>
          <div className='flex flex-row justify-evenly align-middle'>
            <div className='flex justify-center gap-2 align-middle'>
              <Email />
              <div className='my-auto text-gray-500 text-base font-medium'>
                {userData.email}
              </div>
            </div>
            <div className='flex justify-center gap-2 align-middle'>
              <Phone />
              <div className='my-auto text-gray-500 text-base font-medium'>
                {userData.phone}
              </div>
            </div>
            <div className='flex justify-center gap-2 align-middle'>
              <Calender />
              <div className='my-auto text-gray-500 text-base font-medium'>
                {userData.createdAt}
              </div>
            </div>
          </div>
        </div>
        {!isDataShown && (
          <div className='mt-10 px-6 py-10 border-t border-slate-200 text-center'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full lg:w-9/12 px-4'>
                <button
                  className='font-normal text-pink-500 outline-none focus:outline-none'
                  onClick={toggleHandler}
                >
                  Show more
                </button>
              </div>
            </div>
          </div>
        )}
        {isDataShown && (
          <>
            <div className='mt-10 px-6 py-8 border-t border-slate-200 text-center'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full'>
                  {userData.bulkOrders?.map((order) => {
                    return (
                      <PlacedBulkOrder order={order} currentStatus={'super'} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='mt-4 px-6 py-10 text-center'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full lg:w-9/12 px-4'>
                  <button
                    className='font-normal text-sky-500 outline-none focus:outline-none'
                    onClick={toggleHandler}
                  >
                    Show less
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfo;
