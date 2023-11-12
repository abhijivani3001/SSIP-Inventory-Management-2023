import React from 'react';
import StoreManReqOrdThree from './StoreManReqOrdThree';

const StoreManReqOrdTwo = (props) => {
  const bulkOrder = props.bulkOrder;
  // console.log(order);

  // toggle classlist
  const dropdown = document?.getElementById(`collapse-body-${bulkOrder._id}`);
  const dropdownIcon = document?.getElementById(`toggle-icon-${bulkOrder._id}`);
  const toggleButton = document?.getElementById(
    `toggle-button-${bulkOrder._id}`
  );
  const toggleDropdown = () => {
    dropdown.classList?.toggle('hidden');
    dropdownIcon.classList?.toggle('rotate-180');
    toggleButton.classList?.toggle('rounded-t-lg');
    toggleButton.classList?.toggle('rounded-lg');
    toggleButton.classList?.toggle('border-b');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div
        id='accordion-collapse'
        data-accordion='collapse'
        className='bg-slate-100 rounded-lg border border-gray-600 shadow-lg my-2'
      >
        <h2 id='accordion-collapse-heading-1'>
          <button
            id={`toggle-button-${bulkOrder._id}`}
            type='button'
            class='flex flex-col items-center justify-between w-full font-bold text-left text-gray-600 border-gray-700 rounded-lg focus:outline-none'
            data-accordion-target='#accordion-collapse-body-1'
            aria-expanded='true'
            aria-controls='accordion-collapse-body-1'
            onClick={toggleDropdown}
          >
            <div className='flex justify-between w-full align-middle p-5'>
              <span>Ordered Products x{bulkOrder.orders.length}</span>
              <div className='flex gap-8 justify-between align-middle'>
                <div>Created at: {formatDate(bulkOrder.createdAt)}</div>
                <svg
                  data-accordion-icon
                  className='w-3 h-3 rotate-180 shrink-0 my-auto'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                  id={`toggle-icon-${bulkOrder._id}`}
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 5 5 1 1 5'
                  />
                </svg>
              </div>
            </div>
          </button>

          <div
            id={`collapse-body-${bulkOrder._id}`}
            className='hidden w-full rounded-b-lg'
            aria-labelledby='accordion-collapse-heading-1'
          >
            <div className='relative overflow-x-auto shadow-md rounded-b-lg'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Required Quantity
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Delivered
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Available
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bulkOrder.orders.map((order) =>
                    order.status === props.currentStatus ? (
                      <StoreManReqOrdThree
                        key={order.itemId}
                        imageUrl={order.imageUrl}
                        name={order.name}
                        quantity={order.quantity}
                        status={order.status}
                        delivered={order.delivered}
                        itemId={order.itemId}
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
    </>
  );
};

export default StoreManReqOrdTwo;
