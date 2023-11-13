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
  let mainFlag = false; // to check whether the placed order is empty or not

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
              className={`default_tab ${
                currentStatus === 'pending'
                  ? 'status_true_tab'
                  : 'status_false_tab'
              }`}
            >
              <p className='mx-auto'>Pending</p>
            </button>

            <button
              onClick={() => handleTabClick('accepted')}
              className={`default_tab ${
                currentStatus === 'accepted'
                  ? 'status_true_tab'
                  : 'status_false_tab'
              }`}
            >
              <p className='mx-auto'>Approved</p>
            </button>

            <button
              onClick={() => handleTabClick('rejected')}
              className={`default_tab ${
                currentStatus === 'rejected'
                  ? 'status_true_tab'
                  : 'status_false_tab'
              }`}
            >
              <p className='mx-auto'>Rejected</p>
            </button>
          </div>

          <div className='my-6'>
            {usersOfRequestedOrders.map((val) => {
              let flag = false;
              val.bulkOrders.forEach((bulkOrder) => {
                bulkOrder.orders.forEach((order) => {
                  if (order.status === currentStatus){
                    flag = true;
                    mainFlag=true;
                  }
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
            })}
            {!mainFlag && (
              <div className='text-3xl text-gray-700 text-center my-16'>
                No more requested orders available.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeadRequestedOrders;
