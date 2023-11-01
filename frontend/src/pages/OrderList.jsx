import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import axios from '../api/AxiosUrl';

const OrderList = () => {
  const [requestedOrders, setRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get('api/user');
        const user = await res1.data.user;

        const res2 = await axios.post('api/user/users', {
          ...user,
          role: 'employee',
        });
        console.log(res2, user);

        const data = await res2.data.users;

        if (data?.length) {
          setIsRequestedOrdersAvailable(true);
          setRequestedOrders(data);
        } else setIsRequestedOrdersAvailable(false);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isRequestedOrdersAvailable && (
        <div className='text-3xl text-center'>
          No more orders are requested!
        </div>
      )}
      {!isLoading && isRequestedOrdersAvailable && (
        <>
          <div>
            <h1 className='text-6xl font-light'>Order List</h1>
          </div>
          <div className='my-6'>
            <ul>
              <div className='flex flex-col'></div>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;
