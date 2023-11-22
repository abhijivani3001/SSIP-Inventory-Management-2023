import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import RequestedPlanning from './RequestedPlanning/RequestedPlanning';
import PlacedPlanning from './PlacedPlanning/PlacedPlanning';
import ROLES from '../../constants/ROLES';
import AdminPlan from './AdminBudgetPlanning/AdminPlan';

const BudgetPlanning = () => {
  const [currentStatus, setCurrentStatus] = useState('your-plan');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const handleTabClick = (status) => {
    setCurrentStatus(status);
  };

  const getCurrentUserData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const currentUser = await res1.data.user;
      setCurrentUser(currentUser);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUserData();
  }, []);

  return (
    <div className='mx-10 my-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}

      {!isLoading && currentUser?.role !== ROLES.ADMIN && (
        <>
          <div className='my-6'>
            {currentUser?.role !== ROLES.EMPLOYEE && (
              <div className='flex justify-center overflow-x-auto whitespace-nowrap'>
                <button
                  onClick={() => handleTabClick('requested-plan')}
                  className={`default_tab ${
                    currentStatus === 'requested-plan'
                      ? 'status_true_tab'
                      : 'status_false_tab'
                  }`}
                >
                  <p className='mx-auto'>Requested Planned Orders</p>
                </button>

                <button
                  onClick={() => handleTabClick('your-plan')}
                  className={`default_tab ${
                    currentStatus === 'your-plan'
                      ? 'status_true_tab'
                      : 'status_false_tab'
                  }`}
                >
                  <p className='mx-auto'>Your Planned Orders</p>
                </button>
              </div>
            )}

            {currentStatus === 'requested-plan' && (
              <RequestedPlanning
                currentStatus={currentStatus}
                currentUser={currentUser}
              />
            )}
            {currentStatus === 'your-plan' && (
              <PlacedPlanning
                currentStatus={currentStatus}
                currentUser={currentUser}
              />
            )}
          </div>
        </>
      )}

      {!isLoading && currentUser?.role === ROLES.ADMIN && (
        <div>
          <AdminPlan />
        </div>
      )}
    </div>
  );
};

export default BudgetPlanning;
