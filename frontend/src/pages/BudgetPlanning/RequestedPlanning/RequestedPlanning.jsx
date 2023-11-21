import React, { useState, useEffect } from 'react';
import axios from '../../../api/AxiosUrl';

import { findBelowUsers } from '../../../components/Helper/Helper';
import ShowReqPlannigOrdOne from './ShowReqPlannigOrdOne';
import ROLES from '../../../constants/ROLES';

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

  useEffect(() => {
    getRequiredUserData();
  }, []);

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

  return (
    <>
      <div className='mx-10 my-4'>
        {isLoading && (
          <div className='text-xl my-auto text-center '>Loading...</div>
        )}

        {!isLoading && (
          <div className='my-6'>
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
                  <div className='text-center'>
                    <button className='green_btn my-6 uppercase'>Merge</button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RequestedPlanning;
