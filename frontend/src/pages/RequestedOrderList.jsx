import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import axios from '../api/AxiosUrl';
import RequestedOrderData from '../components/RequestedOrderData.jsx/RequestedOrderData';

const RequestedOrderList = () => {
  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
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
          // role: 'employee',
        });
        // console.log(res2, user);

        const data = await res2.data.users;

        if (data?.length) {
          setIsRequestedOrdersAvailable(true);
          setUsersOfRequestedOrders(data);
        } else setIsRequestedOrdersAvailable(false);

        console.log(usersOfRequestedOrders);
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
          <div className='flex justify-between'>
            <h1 className='page-title'>Order List</h1>
            <h2 className='text-2xl font-light my- gap-2 mr-8'>
              <div className='flex items-end gap-6 mt-8'>
                <div>Requested Quantity</div>
              </div>
            </h2>
          </div>
          <div className='my-6'>
            {usersOfRequestedOrders.map((val) => (
              <RequestedOrderData
                key={val._id}
                branch={val.branch}
                subBranch={val.subBranch}
                department={val.department}
                role={val.role}
                name={val.name}
                orders={val.orders} // order array
                userId={val._id}
              />
            ))}
          </div>
          <div className=' text-center'>
            <Button bg='bg-green-400' mb='mb-4'>
              Submit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestedOrderList;
