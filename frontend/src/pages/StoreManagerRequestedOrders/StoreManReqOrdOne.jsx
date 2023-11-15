import React, { useState } from 'react';
import StoreManReqOrdTwo from './StoreManReqOrdTwo';
import { compareStatusForStoreManager } from '../../components/Helper/Helper';

const StoreManReqOrdOne = (props) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
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
            type='button'
            className='flex flex-col items-center justify-between w-full font-bold text-left text-white border-gray-700 rounded-lg focus:outline-none'
            data-accordion-target='#accordion-collapse-body-1'
            aria-expanded='true'
            aria-controls='accordion-collapse-body-1'
            onClick={toggleDropdown}
          >
            <div
              className={`flex justify-between w-full align-middle p-5 ${
                isDropdownVisible ? 'border-b border-gray-600' : ''
              }`}
            >
              <span>{props.name}</span>
              <div className='flex gap-8 justify-between align-middle'>
                <div>Created at: {formatDate(props?.createdAt)}</div>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 transition-transform duration-500 my-auto ${
                    !isDropdownVisible ? 'rotate-180' : ' rotate-0'
                  }`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
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
            className={`w-full rounded-b-lg ${
              isDropdownVisible ? '' : 'hidden'
            }`}
            aria-labelledby='accordion-collapse-heading-1'
          >
            {props.bulkOrders.map((bulkOrder) => {
              let flag = false;

              bulkOrder.orders.forEach((order) => {
                if (
                  compareStatusForStoreManager(
                    props.currentUserRole,
                    order.status,
                    props.currentStatus
                  )
                )
                  flag = true;
              });

              if (flag) {
                return (
                  <StoreManReqOrdTwo
                    bulkOrder={bulkOrder}
                    currentStatus={props.currentStatus}
                    userId={props.userId}
                    currentUserRole={props.currentUserRole}
                    getRequiredUserData={props.getRequiredUserData}
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
