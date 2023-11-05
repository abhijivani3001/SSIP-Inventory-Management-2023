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
        <div className='text-3xl text-center'>Placed orders is empty</div>
      )}

      {!isLoading && isOrdersPlaced && (
        <>
          <h1 className='page-title'>Placed Order</h1>

          <div className='my-6'>
            <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <div class='flex items-center justify-between py-4 px-4 bg-white dark:bg-gray-800'>
                <label for='table-search' class='sr-only'>
                  Search
                </label>
                <div class='relative'>
                  <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <svg
                      class='w-4 h-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    id='table-search-users'
                    class='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search for products'
                  />
                </div>
              </div>
              <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead class='text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' class='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Date
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Quantity
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Received
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {placedOrders.map((item) => (
                    <PlacedOrder
                      key={item._id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      quantity={item.quantity}
                      status={item.status}
                      delivered={item.delivered}
                      orderId={item._id}
                      date={item.createdAt}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlacedOrderList;
