import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import ROLES from '../../constants/ROLES';
import HeadReqOrdData from './HeadReqOrdData';
import HeadReqOrdOne from './HeadReqOrdOne';

const HeadRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get('api/user');
        const user = await res1.data.user;

        let roleOfRequestedUser = '';

        if (user.role === ROLES.DEPARTMENT_HEAD) {
          roleOfRequestedUser = ROLES.DEPARTMENT_STORE_MANAGER;
        } else if (user.role === ROLES.BRANCH_HEAD) {
          roleOfRequestedUser = ROLES.BRANCH_STORE_MANAGER;
        } else if (user.role === ROLES.SUB_BRANCH_HEAD) {
          roleOfRequestedUser = ROLES.SUB_BRANCH_STORE_MANAGER;
        }

        const res2 = await axios.post('api/user/users', {
          ...user,
          role: roleOfRequestedUser,
        });

        const data = await res2.data.users;

        if (data?.length) {
          setIsRequestedOrdersAvailable(true);
          setUsersOfRequestedOrders(data);
          console.log(data);
        } else setIsRequestedOrdersAvailable(false);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleTabClick = (status) => {
    setCurrentStatus(status);
  };

  return (
    <div className='mx-10 my-4'>
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
          <div className='flex justify-center overflow-x-auto whitespace-nowrap'>
            <button
              onClick={() => handleTabClick('pending')}
              className={`inline-flex items-center h-12 w-1/3 py-2 text-lg text-gray-700 border-gray-400 whitespace-nowrap focus:outline-none ${
                currentStatus === 'pending'
                  ? 'border border-b-0 rounded-t-md text-gray-800 font-semibold'
                  : 'whitespace-nowrap border-b cursor-base focus:outline-none hover:border-gray-500 hover:font-medium'
              }`}
              id='pending-status'
            >
              <p className='mx-auto'>Pending</p>
            </button>

            <button
              onClick={() => handleTabClick('accepted')}
              className={`inline-flex items-center h-12 w-1/3 py-2 text-lg text-gray-700 bg-transparent border-gray-400 ${
                currentStatus === 'accepted'
                  ? 'border border-b-0 rounded-t-md text-gray-800 font-semibold'
                  : 'whitespace-nowrap border-b cursor-base focus:outline-none hover:border-gray-500 hover:font-medium'
              }`}
              id='accepted-status'
            >
              <p className='mx-auto'>Approved</p>
            </button>

            <button
              onClick={() => handleTabClick('rejected')}
              className={`inline-flex items-center h-12 w-1/3 py-2 text-lg text-gray-700 bg-transparent border-gray-400 ${
                currentStatus === 'rejected'
                  ? 'border border-b-0 rounded-t-md text-gray-800 font-semibold'
                  : 'whitespace-nowrap border-b cursor-base focus:outline-none hover:border-gray-500 hover:font-medium'
              }`}
              id='rejected-status'
            >
              <p className='mx-auto'>Rejected</p>
            </button>
          </div>

          <div className='my-6'>
            {usersOfRequestedOrders.map((val) => {
              let flag = false;
              val.bulkOrders.forEach((bulkOrder) => {
                bulkOrder.orders.forEach((order) => {
                  if (order.status === currentStatus) flag = true;
                });
              });

              if (flag) {
                return (
                  <HeadReqOrdOne
                    key={val._id}
                    bulkOrders={val.bulkOrders}
                    name={val.name}
                    branch={val.branch}
                    createdAt={val.createdAt}
                    userId={val._id}
                    currentStatus={currentStatus}
                  />
                );
              }
              return <></>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default HeadRequestedOrders;
