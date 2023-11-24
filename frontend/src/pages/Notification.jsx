import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/Notification/NotificationCard';
import axios from './../api/AxiosUrl';
import { useCart } from '../store/CartProvider';
import Loader from '../components/ChakraUI/Loader';

const Notification = () => {
  const [notificationData, setNotificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  };

  useEffect(() => {
    getNotifications();

    return () => {
      getAndUpdateNotifications();
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 my-4'>
          {notificationData?.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Notification;
