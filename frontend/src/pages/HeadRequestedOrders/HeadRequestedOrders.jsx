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
            {usersOfRequestedOrders.map((val) => {
              return (
                val.bulkOrders.length > 0 && (
                  <HeadReqOrdOne
                    key={val._id}
                    bulkOrders={val.bulkOrders}
                    name={val.name}
                    branch={val.branch}
                    createdAt={val.createdAt}
                    userId={val._id}
                  />
                )
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default HeadRequestedOrders;
