import React, { useState, useEffect } from 'react';
import axios from '../api/AxiosUrl';
import PlacedBulkOrder from '../components/PlacedOrder/PlacedBulkOrder';
import { FaTimes } from 'react-icons/fa';

const PlacedOrderList = () => {
  const [placedOrders, setPlacedOrders] = useState([]); // bulk orders
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  let mainFlag = false; // to check whether the placed order is empty or not

  const getOrders = async () => {
    try {
      const result = await axios.get('api/order');
      const data = await result.data.bulkOrders;
      setPlacedOrders(data);
      if (data?.length) setIsOrdersPlaced(true);
      else setIsOrdersPlaced(false);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
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
    <div className='mx-10 my-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isOrdersPlaced && (
        <div className='not_available'>Placed orders are empty</div>
      )}

      {!isLoading && isOrdersPlaced && (
        <>
          <div className='flex justify-between'>
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
            {placedOrders?.map((order) => {
              let flag = false;
              order.orders.forEach((order) => {
                if (order.status === currentStatus) {
                  flag = true;
                  mainFlag = true;
                } else if (
                  currentStatus === 'accepted' &&
                  order.status === 'head-accepted'
                ) {
                  flag = true;
                  mainFlag = true;
                }
              });

              if (flag) {
                return (
                  <PlacedBulkOrder
                    order={order}
                    getOrders={getOrders}
                    currentStatus={currentStatus}
                  />
                );
              }
            })}
            {!mainFlag && (
              <div className='not_available'>
                No more placed orders available.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacedOrderList;
