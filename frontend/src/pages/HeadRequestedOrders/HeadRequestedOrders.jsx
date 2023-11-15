import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import ROLES from '../../constants/ROLES';
import HeadReqOrdData from './HeadReqOrdData';
import HeadReqOrdOne from './HeadReqOrdOne';
import { findBelowUsers } from '../../components/Helper/Helper';

const HeadRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');
  let mainFlag = false; // to check whether the placed order is empty or not

  const getRequiredUserData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const currentUser = await res1.data.user;

      const res2 = await axios.post(
        '/api/user/users',
        findBelowUsers(currentUser)
      );
      console.log(res2);

      const data = await res2.data.users;
      if (data?.length) {
        setIsRequestedOrdersAvailable(true);
        setUsersOfRequestedOrders(data);
      } else setIsRequestedOrdersAvailable(false);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRequiredUserData();
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
        <div className='not_available'>No more orders are requested!</div>
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
                  if (
                    order.status === currentStatus ||
                    (currentStatus === 'accepted' &&
                      order.status === 'head-accepted')
                  ) {
                    flag = true;
                    mainFlag = true;
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
                    getRequiredUserData={getRequiredUserData}
                  />
                );
              }
              return <></>;
            })}
            {!mainFlag && (
              <div className='not_available'>
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
