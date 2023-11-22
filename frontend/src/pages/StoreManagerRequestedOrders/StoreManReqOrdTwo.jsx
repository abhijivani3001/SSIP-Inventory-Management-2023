import React, { useEffect, useState } from 'react';
import StoreManReqOrdThree from './StoreManReqOrdThree';
import { compareStatusForStoreManager } from '../../Helper/Helper';
import axios from '../../api/AxiosUrl';

const StoreManReqOrdTwo = (props) => {
  const bulkOrder = props.bulkOrder;

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [items, setItems] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const countOrders = () => {
    let count = 0;
    bulkOrder.orders.forEach((order) => {
      if (
        compareStatusForStoreManager(
          props.currentUserRole,
          order.status,
          props.currentStatus
        )
      )
        count++;
    });
    return count;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.post('api/item/getitems');
        setItems(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <div
        id='accordion-collapse'
        data-accordion='collapse'
        className='bg-slate-100 rounded-lg border border-gray-600 shadow-lg my-2 mx-4'
      >
        <h2 id='accordion-collapse-heading-1'>
          <button
            type='button'
            className='flex flex-col items-center justify-between w-full font-bold text-left text-gray-600 border-gray-700 rounded-lg focus:outline-none'
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
              <span>Ordered Products x{countOrders()}</span>
              <div className='flex gap-8 justify-between align-middle'>
                <div>Created at: {formatDate(bulkOrder?.createdAt)}</div>
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
                <thead className='text-xs text-gray-700 uppercase bg-slate-100'>
                  <tr className='divide-x'>
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
                    {(props.currentStatus === 'pending' ||
                      props.currentStatus === 'accepted') && (
                      <th scope='col' className='px-6 py-3'>
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bulkOrder.orders.map((order) =>
                    compareStatusForStoreManager(
                      props.currentUserRole,
                      order.status,
                      props.currentStatus
                    ) ? (
                      <StoreManReqOrdThree
                        key={order.itemId}
                        imageUrl={order.imageUrl}
                        name={order.name}
                        quantity={order.quantity}
                        status={order.status}
                        delivered={order.delivered}
                        itemId={order.itemId}
                        bulkOrderId={bulkOrder._id}
                        orderId={order._id}
                        userId={props.userId}
                        currentStatus={props.currentStatus}
                        getRequiredUserData={props.getRequiredUserData}
                        masterPassword={order.masterPassword}
                        items={items}
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
