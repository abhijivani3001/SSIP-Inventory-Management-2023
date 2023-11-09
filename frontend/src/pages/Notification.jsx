import React from 'react';
import NotificationCard from '../components/Notification/NotificationCard';

const Notification = () => {
  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='page-title'>Notifications</h1>
      </div>
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default Notification;
