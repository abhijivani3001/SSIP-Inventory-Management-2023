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
        console.log(data);

        setPlacedOrders(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      <div className='flex justify-between'>
        <h1 className='text-6xl font-light'>Placed Order</h1>
        <h2 className='text-2xl font-light my-auto gap-2 mr-8'>
          <div className='flex items-end gap-2'>
            <div className='mr-2'>Quantity</div>
            <div className='ml-2'>Status</div>
          </div>
        </h2>
      </div>

      <div className='my-6'>
        {/* <PlacedOrder value={value} status={status} />
        <PlacedOrder value={value} status={status} />
        <PlacedOrder value={value} status={status} />
        <PlacedOrder value={value} status={status} />
        <PlacedOrder value={value} status={status} /> */}
        <PlacedOrder data={placedOrders} />
      </div>
    </div>
  );
};

export default PlacedOrderList;
