import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { useCart } from '../../store/CartProvider';
import HeadReqOrdOne from './HeadReqOrdOne';
import { findBelowUsers } from '../../Helper/Helper';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/ChakraUI/Loader';

const HeadRequestedOrders = () => {
  const { cart, dispatch } = useCart();

  const [usersOfRequestedOrders, setUsersOfRequestedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestedOrdersAvailable, setIsRequestedOrdersAvailable] =
    useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
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
    setSearchTerm('');
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 my-4'>
          {!isRequestedOrdersAvailable && (
            <div className='not_available'>No more orders are requested!</div>
          )}

          {isRequestedOrdersAvailable && (
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
              <div className='flex items-center mt-4 justify-end'>
                <input
                  type='text'
                  placeholder='Search product here...'
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className='border rounded px-2 py-1 mr-2'
                />
                {searchTerm && (
                  <FaTimes
                    onClick={clearSearchTerm}
                    className='text-gray-500 cursor-pointer'
                  />
                )}
              </div>

              <div className='my-4'>
                {usersOfRequestedOrders.map((val) => {
                  let flag = false;
                  val.bulkOrders.forEach((bulkOrder) => {
                    bulkOrder.orders.forEach((order) => {
                      if (
                        order.status === currentStatus ||
                        (currentStatus === 'accepted' &&
                          order.status === 'head-accepted')
                      ) {
                        if (
                          order.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          order.itemId
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          flag = true;
                          mainFlag = true;
                        }
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
      )}
    </>
  );
};

export default HeadRequestedOrders;
