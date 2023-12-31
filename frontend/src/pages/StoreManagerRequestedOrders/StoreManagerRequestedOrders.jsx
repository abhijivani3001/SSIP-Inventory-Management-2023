import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import StoreManReqOrdOne from './StoreManReqOrdOne';
import { toast } from 'react-toastify';

import {
  findBelowUsers,
  compareStatusForStoreManager,
} from '../../Helper/Helper';
import Loader from '../../components/ChakraUI/Loader';

const StoreManagerRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');
  const currentUserRole = useRef('');
  let mainFlag = false; // to check whether the placed order is empty or not

  const handleMergeOrder = async () => {
    toast.success('Order Merged Successfully', {
      autoClose: 1500,
    });

    // to update the status of order
    const updateStatus = async (userId, bulkOrderId, orderId) => {
      const res = await axios.put(`api/order/${bulkOrderId}/${orderId}`, {
        user_id: userId,
        status: 'accepted',
      });
      // console.log(res);
      getRequiredUserData();
    };

    // let arr = [];
    usersOfRequestedOrders.forEach((user) => {
      // let arr2 = [];
      user.bulkOrders.forEach((bulkOrder) => {
        // let arr3 = [];
        bulkOrder.orders.forEach((order) => {
          if (order.status === 'pending' || order.status === 'head-accepted') {
            // arr3.push({ orderId: order.itemId });

            updateStatus(user._id, bulkOrder._id, order._id);
          }
        });
        // arr2.push({ bulkOrderId: arr3 });
      });
      // arr.push({ userId: arr2 });
    });
    // console.log(arr);

    // -------
    const orderMap = new Map();
    usersOfRequestedOrders.forEach((user) => {
      user.bulkOrders.forEach((bulkOrder) => {
        bulkOrder.orders.forEach((order) => {
          if (order.status === 'pending' || order.status === 'head-accepted') {
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
                imageUrl: order.imageUrl,
              });
            }
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
        imageUrl: value.imageUrl,
      });
    });

    ordersArray.forEach((item) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    });
  };

  const getRequiredUserData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const currentUser = await res1.data.user;

      const res2 = await axios.post(
        '/api/user/users',
        findBelowUsers(currentUser)
      );
      currentUserRole.current = currentUser.role;

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
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 mt-4'>
          {!isRequestedOrdersAvailable && (
            <div className='not_available'>No more orders are requested!</div>
          )}

          {isRequestedOrdersAvailable && (
            <>
              <div className='my-6'>
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

                {usersOfRequestedOrders?.map((val) => {
                  let flag = false;
                  val.bulkOrders.forEach((bulkOrder) => {
                    bulkOrder.orders.forEach((order) => {
                      if (
                        compareStatusForStoreManager(
                          currentUserRole.current,
                          order.status,
                          currentStatus
                        )
                      ) {
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
                        currentUserRole={currentUserRole.current}
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
      )}
    </>
  );
};

export default StoreManagerRequestedOrders;
