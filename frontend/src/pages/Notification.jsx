import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/Notification/NotificationCard';
import axios from './../api/AxiosUrl';
import { useCart } from '../store/CartProvider';

const Notification = () => {
  const [notificationData, setNotificationData] = useState(null);
  const { dispatch } = useCart();

  const getAndUpdateNotifications = async () => {
    try {
      const res = await axios.put(`/api/notification`);
      dispatch({ type: 'NOTIFICATION', payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const res = await axios.get('/api/notification');
      console.log(res.data.notifications);
      setNotificationData(res?.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();

    return () => {
      getAndUpdateNotifications();
    };
  }, []);

  const postNotifications = async () => {
    try {
      const res = await axios.post('/api/notification', {
        // receiverId: '654cf8f57aab3df914e7f61c',
        message: 'test5',
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-10 my-4'>
      <div>
        <h1 className='page-title'>Notifications</h1>
      </div>

      {notificationData?.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}

      <button className='blue_btn' onClick={postNotifications}>
        post
      </button>
      <button className='blue_btn' onClick={getAndUpdateNotifications}>
        Update
      </button>
    </div>
  );
};

export default Notification;
