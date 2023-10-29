import React, { useState } from 'react';
import NotificationCard from '../components/Notification/NotificationCard';

const Notification = () => {
  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Notifications</h1>
      </div>
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default Notification;
