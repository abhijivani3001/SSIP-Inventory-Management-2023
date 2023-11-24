import React, { useState, useEffect } from 'react';
import axios from '../../../api/AxiosUrl';

import { findBelowUsers } from '../../../Helper/Helper';
import ShowReqPlannigOrdOne from './ShowReqPlannigOrdOne';
import ROLES from '../../../constants/ROLES';
import { toast } from 'react-toastify';
import Loader from '../../../components/ChakraUI/Loader';

const RequestedPlanning = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersOfRequestedPlans, setUsersOfRequestedPlans] = useState([]);
  const [isRequestedPlansAvailable, setIsRequestedPlansAvailable] =
    useState(false);

  let mainFlag = false; // to check whether the placed order is empty or not

  const getRequiredUserData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const currentUser = await res1.data.user;

      const res2 = await axios.post(
        '/api/user/users',
        findBelowUsers(currentUser)
      );
      const data = await res2.data.users;
      console.log(data);

      if (data?.length) {
        setUsersOfRequestedPlans(data);
        console.log(usersOfRequestedPlans);
      } else setIsRequestedPlansAvailable(false);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const checkStatus = (user) => {
    if (user.planningBulkOrders.planningOrders.length) {
      if (
        props.currentUser.role ===
        (ROLES.BRANCH_STORE_MANAGER || ROLES.DEPARTMENT_STORE_MANAGER)
      ) {
        if (user.planningBulkOrders.status === 'accepted') return true;
        return false;
      } else if (user.planningBulkOrders.status === 'submitted') {
        return true;
      }
      return false;
    }
    return false;
  };

  const handleMergeOrder = async () => {
    toast.success('Order Merged Successfully', {
      autoClose: 1500,
    });

    // let arr = [];

    // -------
    const orderMap = new Map();
    usersOfRequestedPlans.forEach((user) => {
      if (checkStatus(user)) {
        user.planningBulkOrders.planningOrders.forEach((order) => {
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
        });
      }
    });

    let ordersArray = [];
    orderMap.forEach((value, key) => {
      ordersArray.push({
        itemId: key,
        quantity: value.quantity,
      });
    });
    console.log(orderMap);
    const res = await axios.post('api/planningorder', [...ordersArray]);
    console.log(res);
  };

  useEffect(() => {
    getRequiredUserData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 my-6'>
          {usersOfRequestedPlans?.map((user) => {
            let flag = false;

            if (checkStatus(user)) {
              flag = true;
              mainFlag = true;
            }

            if (flag) {
              return (
                <ShowReqPlannigOrdOne
                  key={user._id}
                  name={user.name}
                  date={user.planningBulkOrders.updatedAt}
                  planningBulkOrders={user.planningBulkOrders}
                  role={user.role}
                  userId={user._id}
                  status={user.planningBulkOrders.status}
                  currentUser={props.currentUser}
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

          {mainFlag && (
            <>
              {props.currentUser.role.includes('store') && (
                <div className='text-center' onClick={handleMergeOrder}>
                  <button className='green_btn my-6 uppercase'>Merge</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RequestedPlanning;
