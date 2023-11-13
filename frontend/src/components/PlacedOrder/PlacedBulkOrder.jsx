import React, { useState } from 'react';
import PlacedOrder from './PlacedOrder';

const PlacedBulkOrder = (props) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const order = props.order;

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      id='accordion-collapse'
      data-accordion='collapse'
      className='bg-white rounded-lg border border-gray-300 shadow-lg my-2'
    >
      <h2 id='accordion-collapse-heading-1'>
        <button
          id={`toggle-button-${order?._id}`}
          type='button'
          className='flex flex-col items-center justify-between w-full font-medium text-left text-gray-600 border-gray-700 rounded-lg focus:outline-none'
          data-accordion-target='#accordion-collapse-body-1'
          aria-expanded='true'
          aria-controls='accordion-collapse-body-1'
          onClick={toggleDropdown}
        >
          <div
            className={`flex justify-between w-full align-middle p-5 ${
              isDropdownVisible ? 'border-b' : ''
            }`}
          >
            <span>Ordered Products x{order?.orders.length}</span>
            <div className='flex gap-8 justify-between align-middle'>
              <div>Created at: {formatDate(order?.createdAt)}</div>
              <svg
                data-accordion-icon
                className={`w-3 h-3 transition-transform duration-500 my-auto ${
                  !isDropdownVisible ? 'rotate-180' : ' rotate-0'
                }`}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 6'
                id={`toggle-icon-${order?._id}`}
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5 5 1 1 5'
                />
              </svg>
            </div>
          </div>
        </button>

        <div
          id={`collapse-body-${order?._id}`}
          className={`w-full rounded-b-lg ${isDropdownVisible ? '' : 'hidden'}`}
          aria-labelledby='accordion-collapse-heading-1'
        >
          <div className='relative overflow-x-auto shadow-md rounded-b-lg'>
            <table className='w-full divide-y text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-slate-100'>
                <tr className='divide-x'>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Quantity
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Received
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.orders.map((item) =>
                  item.status === props.currentStatus ? (
                    <PlacedOrder
                      key={item.itemId}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      quantity={item.quantity}
                      status={item.status}
                      delivered={item.delivered}
                      orderId={item._id}
                      bulkOrderId={order._id}
                      getOrders={props.getOrders}
                    />
                  ) : (
                    ''
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </h2>
    </div>
  );
};

export default PlacedBulkOrder;
