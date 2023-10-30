import React, { useState, useEffect } from 'react';
import PlacedOrder from '../components/PlacedOrder/PlacedOrder';

import axios from '../api/AxiosUrl';

const PlacedOrderList = () => {
  const [value, setValue] = useState(12);
  const [status, setStatus] = useState('Pending');

  const [placedOrders, setPlacedOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/order');
        const data = await result.data.orders;
        // console.log(data);

        setPlacedOrders(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  // console.log(placedOrders);

  return (
    <div className='mx-8 mt-4'>
      <div className='flex justify-between'>
        <h1 className='text-6xl font-light'>Placed Order</h1>
        <h2 className='text-2xl font-light my- gap-2 mr-8'>
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
            name={item.itemId}
            quantity={item.quantity}
            status={item.status}
            delivered={item.delivered}
          />
        ))}
      </div>
    </div>
  );
};

export default PlacedOrderList;
