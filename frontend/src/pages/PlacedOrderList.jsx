import React, { useState, useEffect } from 'react';
// import PlacedOrder from '../components/PlacedOrder/PlacedOrder';
import axios from '../api/AxiosUrl';
import PlacedBulkOrder from '../components/PlacedOrder/PlacedBulkOrder';

const PlacedOrderList = () => {
  const [placedOrders, setPlacedOrders] = useState([]); // bulk orders
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);

  const [currentStatus, setCurrentStatus] = useState('pending');
  let mainFlag=false;

  const getOrders = async () => {
    try {
      const result = await axios.get('api/order');
      const data = await result.data.bulkOrders;
      console.log(data);

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
  };

  return (
    <div className='mx-10 my-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isOrdersPlaced && (
        <div className='text-3xl text-center'>Placed orders is empty</div>
      )}

      {!isLoading && isOrdersPlaced && (
        <>
          <div className='flex justify-center overflow-x-auto whitespace-nowrap'>
            <button
              onClick={() => handleTabClick('pending')}
              className={`default_tab ${
                currentStatus === 'pending'
                  ? 'status_true_tab'
                  : 'status_false_tab'
              }`}
              id='pending-status'
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
              id='accepted-status'
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
              id='rejected-status'
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
              id='completed-status'
            >
              <p className='mx-auto'>Completed</p>
            </button>
          </div>

          <div className='my-4'>
            {placedOrders?.map((order) => {
              let flag = false;
              order.orders.forEach((order) => {
                if (order.status === currentStatus){
                  flag = true;
                  mainFlag=true;
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
            {!mainFlag && <div className='text-3xl text-gray-700 text-center my-16'>No more placed orders available.</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacedOrderList;
