import React from 'react';

const NotificationCard = (props) => {
  const notification = props.notification;

  const formattedDate = new Date(notification.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <div className={`border-2 flex justify-between ${notification.isSeen ? 'bg-white' : 'bg-green-300'} border-gray-300 px-4 py-2 rounded-lg my-2 shadow-lg`}>
        <div>
          <div className='text-xl mb-2 my-auto font-semibold tracking-tight text-gray-800'>
            Sent by: {notification.senderName}
          </div>
          <div className='text-md my-auto font-medium text-gray-500'>
            {notification.message}
          </div>
        </div>
        <div>
          {formattedDate}
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
