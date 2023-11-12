import React, { useState, useEffect } from 'react';
// import PlacedOrder from '../components/PlacedOrder/PlacedOrder';
import axios from '../api/AxiosUrl';
import PlacedBulkOrder from '../components/PlacedOrder/PlacedBulkOrder';

const PlacedOrderList = () => {
  const [placedOrders, setPlacedOrders] = useState([]); // bulk orders
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);

  const getOrders = async () => {
    try {
      const result = await axios.get('api/order');
      const data = await result.data.bulkOrders;
      // console.log(data);

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
  // console.log(placedOrders);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isOrdersPlaced && (
        <div className='text-3xl text-center'>Placed orders is empty</div>
      )}

      {!isLoading && isOrdersPlaced && (
        <div className='my-4 mx-2'>
          {placedOrders.map((order) => (
            <PlacedBulkOrder order={order} getOrders={getOrders} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacedOrderList;
