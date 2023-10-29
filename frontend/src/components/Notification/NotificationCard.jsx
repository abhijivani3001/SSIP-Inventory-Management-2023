import React from 'react';

const NotificationCard = () => {
  return (
    <>
      <div className='border-2 flex flex-col bg-white border-gray-300 px-4 py-2 rounded-lg my-4 '>
        <h5 className='text-xl mb-2 my-auto font-semibold tracking-tight text-gray-900'>
          24 Oct,2023 12:38
        </h5>
        <h5 className='text-lg my-auto font-semibold tracking-tight text-gray-700'>
          A request from SJM Sir arrive.
        </h5>
      </div>
    </>
  );
};

export default NotificationCard;
