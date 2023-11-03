import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import ROLES from '../../constants/ROLES';
import HeadReqOrdData from './HeadReqOrdData';

const HeadRequestedOrders = () => {
  const { cart, dispatch } = useCart();
  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  // const handleMergeOrder = async () => {
  //   const orderMap = new Map();
  //   usersOfRequestedOrders.forEach((user) => {
  //     user.orders.forEach((order) => {
  //       if (orderMap.has(order.itemId)) {
  //         const mapItem = orderMap.get(order.itemId);
  //         let updatedOrder = {
  //           ...mapItem,
  //           quantity: order.quantity + mapItem.quantity,
  //         };
  //         orderMap.set(order.itemId, updatedOrder);
  //       } else {
  //         orderMap.set(order.itemId, {
  //           name: order.name,
  //           quantity: order.quantity,
  //         });
  //       }
  //     });
  //   });

  //   let ordersArray = [];
  //   orderMap.forEach((value, key) => {
  //     ordersArray.push({
  //       _id: key,
  //       amount: value.quantity,
  //       name: value.name,
  //     });
  //   });

  //   ordersArray.forEach((item) => {
  //     dispatch({ type: 'ADD_ITEM', payload: item });
  //   });
  // };

  useEffect(() => {
    (async () => {
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
        } else if (user.role === ROLES.SUB_BRANCH_HEAD) {
          roleOfRequestedUser = ROLES.SUB_BRANCH_STORE_MANAGER;
        }

        const res2 = await axios.post('api/user/users', {
          ...user,
          role: roleOfRequestedUser,
        });
        // console.log(res2, user);

        const data = await res2.data.users;

        console.log(data);

        if (roleOfRequestedUser2) {
          const res3 = await axios.post('api/user/users', {
            ...user,
            role: roleOfRequestedUser2,
          });
          const tempdata = await res3.data.users;
          data.push(...tempdata);
          console.log(data);
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
          </div>
          <div className='my-6'>
            {usersOfRequestedOrders.map((val) => (
              <HeadReqOrdData
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
          {/* <div className=" text-center">
            <Button bg="bg-green-400" mb="mb-4" onClick={handleMergeOrder}>
              Submit
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default HeadRequestedOrders;
