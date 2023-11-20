import React, { useState, useEffect } from 'react';
import ShowReqPlanningOrdTwo from './ShowReqPlanningOrdTwo';

const ShowReqPlannigOrdOne = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  let price = 0;
  useEffect(() => {
    props.planningBulkOrders.planningOrders.forEach((order) => {
      price += order.quantity * order.price;
    });
    setTotalPrice(price);
  }, [props.planningBulkOrders]);

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
                <div>Created at: {formatDate(props.date)}</div>
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
            <div className='relative overflow-x-auto shadow-md rounded-b-lg'>
              <table className='w-full divide-y text-sm text-left text-gray-500'>
                <thead className='text-sm text-gray-700 uppercase bg-slate-100'>
                  <tr className='divide-x'>
                    <th scope='col' className='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Quantity
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Total Price
                    </th>
                    {(props.currentStatus === 'pending' ||
                      props.currentStatus === 'accepted') && (
                      <th scope='col' className='px-6 py-3'>
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {props.planningBulkOrders.planningOrders.map((order) => {
                    return (
                      <ShowReqPlanningOrdTwo
                        key={order._id}
                        name={order.name}
                        category={order.category}
                        imageUrl={order.imageUrl}
                        price={order.price}
                        quantity={order.quantity}
                        orderId={order.itemId}
                      />
                    );
                  })}
                </tbody>
                <tr className='bg-white divide-x'>
                  <td colSpan={3}></td>
                  <td className='px-6 py-2 text-base font-semibold text-gray-700'>
                    {totalPrice}
                  </td>
                </tr>
                {props.currentUser.role.includes('head') && (
                  <tr className='bg-white'>
                    <td colSpan={4}>
                      <div className='flex gap-2 justify-center'>
                        <button className='green_btn my-2 uppercase'>
                          Approve
                        </button>
                        <button className='trans_red_btn my-2 uppercase'>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>
        </h2>
      </div>
    </>
  );
};

export default ShowReqPlannigOrdOne;
