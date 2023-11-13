import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import ROLES from '../../constants/ROLES';
import StoreReqOrdData from './StoreReqOrdData';
import StoreManReqOrdOne from './StoreManReqOrdOne';

const StoreManagerRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');
  let mainFlag = false; // to check whether the placed order is empty or not

  const handleMergeOrder = async () => {
    const orderMap = new Map();
    usersOfRequestedOrders.forEach((user) => {
      user.bulkOrders.forEach((bulkOrder) => {
        bulkOrder.orders.forEach((order) => {
          if (orderMap.has(order.itemId)) {
            const mapItem = orderMap.get(order.itemId);
            let updatedOrder = {
              ...mapItem,
              quantity: order.quantity + mapItem.quantity,
            };
            orderMap.set(order.itemId, updatedOrder);
          } else {
            orderMap.set(order.itemId, {
              name: order.name,
              quantity: order.quantity,
            });
          }
        });
      });
    });

    let ordersArray = [];
    orderMap.forEach((value, key) => {
      ordersArray.push({
        _id: key,
        amount: value.quantity,
        name: value.name,
      });
    });

    ordersArray.forEach((item) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    });
  };

  const getRequiredData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const user = await res1.data.user;

      let roleOfRequestedUser = '';
      let roleOfRequestedUser2 = '';

      if (user.role === ROLES.DEPARTMENT_STORE_MANAGER) {
        roleOfRequestedUser = ROLES.BRANCH_STORE_MANAGER;
      } else if (user.role === ROLES.BRANCH_STORE_MANAGER) {
        roleOfRequestedUser = ROLES.SUB_BRANCH_STORE_MANAGER;
        roleOfRequestedUser2 = ROLES.BRANCH_HEAD;
      } else if (user.role === ROLES.SUB_BRANCH_STORE_MANAGER) {
        roleOfRequestedUser = ROLES.EMPLOYEE;
        roleOfRequestedUser2 = ROLES.SUB_BRANCH_HEAD;
      }

      const res2 = await axios.post('api/user/users', {
        ...user,
        role: roleOfRequestedUser,
      });

      const data = await res2.data.users;
      // console.log(data);

      if (roleOfRequestedUser2) {
        const res3 = await axios.post('api/user/users', {
          ...user,
          role: roleOfRequestedUser2,
        });
        const tempdata = await res3.data.users;
        data.push(...tempdata);
        // console.log(data);
      }

      if (data?.length) {
        setIsRequestedOrdersAvailable(true);
        setUsersOfRequestedOrders(data);
      } else setIsRequestedOrdersAvailable(false);

      console.log(usersOfRequestedOrders);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  const handleTabClick = (status) => {
    setCurrentStatus(status);
  };

  return (
    <div className='mx-10 mt-4'>
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
              <p className='mx-auto'>Accepted</p>
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

            <button
              onClick={() => handleTabClick('completed')}
              className={`default_tab ${
                currentStatus === 'completed'
                  ? 'status_true_tab'
                  : 'status_false_tab'
              }`}
            >
              <p className='mx-auto'>Completed</p>
            </button>
          </div>

          <div className='my-6'>
            {usersOfRequestedOrders?.map((val) => {
              // <StoreReqOrdData
              //   key={val._id}
              //   branch={val.branch}
              //   subBranch={val.subBranch}
              //   department={val.department}
              //   role={val.role}
              //   name={val.name}
              //   // orders={val.bulkOrders.filter(
              //   //   (dataItem) =>
              //   //     dataItem.status !== 'completed' &&
              //   //     dataItem.status !== 'rejected'
              //   // )} // order array

              //   orders={val.bulkOrders} // bulk order
              //   userId={val._id}
              //   getRequiredData={getRequiredData}
              // />

              let flag = false;
              val.bulkOrders.forEach((bulkOrder) => {
                bulkOrder.orders.forEach((order) => {
                  if (order.status === currentStatus) {
                    flag = true;
                    mainFlag = true;
                  }
                });
              });

              if (flag) {
                return (
                  <StoreManReqOrdOne
                    key={val._id}
                    name={val.name}
                    branch={val.branch}
                    subBranch={val.subBranch}
                    department={val.department}
                    role={val.role}
                    bulkOrders={val.bulkOrders}
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

          {mainFlag && currentStatus === 'pending' && (
            <div className='text-center'>
              <button className='green_btn mb-4' onClick={handleMergeOrder}>
                MERGE ALL ORDERS
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoreManagerRequestedOrders;
