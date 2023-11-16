import React from 'react';

const NotificationCard = (props) => {
  const notification = props.notification;

  return (
    <>
      <div className='border-2 flex justify-between bg-white border-gray-300 px-4 py-2 rounded-lg my-2 shadow-lg '>
        <div>
          <div className='text-xl mb-2 my-auto font-semibold tracking-tight text-gray-800'>
            Sent by: {notification.senderId}
          </div>
          <div className='text-md my-auto font-medium text-gray-500'>
            {notification.message}
          </div>
        </div>
        <div>
          Created at: TIME
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
