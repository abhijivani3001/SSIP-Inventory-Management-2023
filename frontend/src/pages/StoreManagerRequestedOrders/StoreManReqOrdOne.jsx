import React from 'react';
import StoreManReqOrdTwo from './StoreManReqOrdTwo';

const StoreManReqOrdOne = (props) => {
  // toggle classlist
  const dropdown = document?.getElementById(`collapse-body-${props?.userId}`);
  const dropdownIcon = document?.getElementById(`toggle-icon-${props?.userId}`);
  const toggleButton = document?.getElementById(
    `toggle-button-${props?.userId}`
  );
  const toggleDropdown = () => {
    dropdown?.classList?.toggle('hidden');
    dropdownIcon?.classList?.toggle('rotate-180');
    toggleButton?.classList?.toggle('rounded-t-lg');
    toggleButton?.classList?.toggle('rounded-lg');
    toggleButton?.classList?.toggle('border-b');
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
        className='bg-[#379588] rounded-lg border border-gray-600 shadow-lg my-2'
      >
        <h2 id='accordion-collapse-heading-1'>
          <button
            id={`toggle-button-${props?.userId}`}
            type='button'
            class='flex flex-col items-center justify-between w-full font-bold text-left text-white border-gray-700 rounded-lg focus:outline-none'
            data-accordion-target='#accordion-collapse-body-1'
            aria-expanded='true'
            aria-controls='accordion-collapse-body-1'
            onClick={toggleDropdown}
          >
            <div className='flex justify-between w-full align-middle p-5'>
              <span>{props.name}</span>
              <div className='flex gap-8 justify-between align-middle'>
                <div>Created at: {formatDate(props?.createdAt)}</div>
                <svg
                  data-accordion-icon
                  className='w-3 h-3 rotate-180 shrink-0 my-auto'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                  id={`toggle-icon-${props?.userId}`}
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
            id={`collapse-body-${props?.userId}`}
            className='hidden my-4 mx-4 rounded-b-lg'
            aria-labelledby='accordion-collapse-heading-1'
          >
            {props.bulkOrders.map((bulkOrder) => {
              let flag = false;
              {
                bulkOrder.orders.forEach((order) => {
                  if (order.status === props.currentStatus) flag = true;
                });
              }

              if (flag) {
                return (
                  <StoreManReqOrdTwo
                    bulkOrder={bulkOrder}
                    currentStatus={props.currentStatus}
                  />
                );
              }
              return <></>;
            })}
          </div>
        </h2>
      </div>
    </>
  );
};

export default StoreManReqOrdOne;
