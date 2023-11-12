import React from 'react';
import HeadReqOrdThree from './HeadReqOrdThree';

const HeadReqOrdTwo = (props) => {
  const order = props.order;

  // toggle classlist
  const dropdown = document?.getElementById(`collapse-body-${order._id}`);
  const dropdownIcon = document?.getElementById(`toggle-icon-${order._id}`);
  const toggleButton = document?.getElementById(`toggle-button-${order._id}`);
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
        className='bg-slate-200 rounded-lg border border-gray-600 shadow-lg my-2'
      >
        <h2 id='accordion-collapse-heading-1'>
          <button
            id={`toggle-button-${order._id}`}
            type='button'
            class='flex flex-col items-center justify-between w-full font-bold text-left text-gray-600 border-gray-700 rounded-lg focus:outline-none'
            data-accordion-target='#accordion-collapse-body-1'
            aria-expanded='true'
            aria-controls='accordion-collapse-body-1'
            onClick={toggleDropdown}
          >
            <div className='flex justify-between w-full align-middle p-5'>
              <span>Ordered Products x{order.orders.length}</span>
              <div className='flex gap-8 justify-between align-middle'>
                <div>Created at: {formatDate(order.createdAt)}</div>
                <svg
                  data-accordion-icon
                  className='w-3 h-3 rotate-180 shrink-0 my-auto'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                  id={`toggle-icon-${order._id}`}
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
            id={`collapse-body-${order._id}`}
            className='hidden w-full rounded-b-lg'
            aria-labelledby='accordion-collapse-heading-1'
          >
            <div className='relative overflow-x-auto shadow-md rounded-b-lg'>
              <table className='w-full divide-y text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400'>
                  <tr className='divide-x'>
                    <th scope='col' className='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Required Quantity
                    </th>
                    {/* <th scope='col' className='px-6 py-3'>
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {order.orders.map((item) => (
                    <HeadReqOrdThree
                      key={item.itemId}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      quantity={item.quantity}
                      status={item.status}
                      delivered={item.delivered}
                      itemId={item.itemId}
                    />
                  ))}
                </tbody>
              </table>
              <div className='flex bg-white justify-center gap-2'>
                <button className='blue_btn my-4'>Approve</button>
                <button className='trans_red_btn my-4'>Reject</button>
              </div>
            </div>
          </div>
        </h2>
      </div>
    </>
  );
};

export default HeadReqOrdTwo;
