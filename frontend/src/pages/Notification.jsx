import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/Notification/NotificationCard';
import axios from './../api/AxiosUrl';

const Notification = () => {
  const [notificationData, setNotificationData] = useState(null);

  const getAndUpdateNotifications = async () => {
    try {
      const res = await axios.put('/api/notification');
      console.log(res);
      setNotificationData(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAndUpdateNotifications();
  }, []);

  return (
    <div className='mx-10 mt-4'>
      <div>
        <h1 className='page-title'>Notifications</h1>
      </div>

      {notificationData?.map((notification) => (
        <NotificationCard notification={notification} />
      ))}
    </div>
  );
};

export default Notification;
