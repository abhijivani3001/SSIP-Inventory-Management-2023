import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import ROLES from '../../constants/ROLES';
import StoreReqOrdData from './StoreReqOrdData';
import TempOne from './TempOne';

const StoreManagerRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const handleMergeOrder = async () => {
    const orderMap = new Map();
    usersOfRequestedOrders.forEach((user) => {
      user.orders.forEach((order) => {
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
          <div className='my-6 mx-2'>
            {usersOfRequestedOrders?.map((val) =>
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
              val.bulkOrders.length > 0 ? (
                <TempOne
                  key={val._id}
                  name={val.name}
                  branch={val.branch}
                  subBranch={val.subBranch}
                  department={val.department}
                  role={val.role}
                  bulkOrders={val.bulkOrders}
                  createdAt={val.createdAt}
                  userId={val._id}
                />
              ) : (
                ''
              )
            )}
          </div>
          <div className='text-center'>
            <button className='green_btn mb-4' onClick={handleMergeOrder}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreManagerRequestedOrders;
