import React, { useState, useEffect } from 'react';
import PlacedOrder from '../components/PlacedOrder/PlacedOrder';

import axios from '../api/AxiosUrl';

const PlacedOrderList = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/order');
        const data = await result.data.orders;
        // console.log(data);

        setPlacedOrders(data);
        if (data.length) setIsOrdersPlaced(true);
        else setIsOrdersPlaced(false);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    })();
  }, []);
  // console.log(placedOrders);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isOrdersPlaced && (
        <div className='text-3xl text-center '>Placed orders is empty</div>
      )}

      {!isLoading && isOrdersPlaced && (
        <>
          <div className='flex justify-between'>
            <h1 className='page-title'>Placed Order</h1>
            <h2 className='text-2xl font-light gap-4 mr-12'>
              <div className='flex items-end gap-6 mt-8'>
                <div>Quantity</div>
                <div>Received</div>
                <div>Status</div>
              </div>
            </h2>
          </div>

          <div className='my-6'>
            {placedOrders.map((item) => (
              <PlacedOrder
                key={item._id}
                name={item.name}
                quantity={item.quantity}
                status={item.status}
                delivered={item.delivered}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacedOrderList;
