import React, { useState } from 'react';
import HeadReqOrdThree from './HeadReqOrdThree';
import axios from '../../api/AxiosUrl';
import { toast } from 'react-toastify';

const HeadReqOrdTwo = (props) => {
  const bulkOrder = props.bulkOrder;

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const postNotification = async (message, receiverId, up) => {
    try {
      const res = await axios.post('/api/notification', {
        receiverId: receiverId,
        message: message,
        up: up,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (bulkOrderId, status) => {
    try {
      if (
        status === 'rejected' &&
        !window.confirm('DO YOU WANT TO REJECT ORDER')
      )
        return;

      const res = await axios.put(`api/order/${bulkOrderId}`, {
        status,
        user_id: props.userId,
      });
      console.log(res);

      let up = false;
      if (status === 'head-accepted') {
        postNotification(
          'Your order is Approved by Head of your branch',
          '',
          up
        );
        up = true;
        postNotification('You have got a new order', '', up);
        toast.success('Order approved Successfully', {
          autoClose: 1500,
        });
      } else if (status === 'rejected') {
        postNotification(
          'Your order is Rejected by Head of your branch',
          '',
          up
        );
        toast.error('Order rejected Successfully', {
          autoClose: 1000,
        });
      }

      props.getRequiredUserData();
    } catch (error) {}
  };

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
              <span>Ordered Products x{bulkOrder.orders.length}</span>
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
                    {/* {props.currentStatus === 'pending' && (
                      <th scope='col' className='px-6 py-3'>
                        Action
                      </th>
                    )} */}
                  </tr>
                </thead>
                <tbody>
                  {bulkOrder.orders.map((order) =>
                    order.status === props.currentStatus ||
                    (props.currentStatus === 'accepted' &&
                      order.status === 'head-accepted') ? (
                      <HeadReqOrdThree
                        key={order.itemId}
                        imageUrl={order.imageUrl}
                        name={order.name}
                        quantity={order.quantity}
                        status={order.status}
                        delivered={order.delivered}
                        itemId={order.itemId}
                        currentStatus={props.currentStatus}
                      />
                    ) : (
                      ''
                    )
                  )}
                </tbody>
              </table>
              {props.currentStatus === 'pending' && (
                <div className='flex bg-white justify-center gap-2'>
                  <button
                    className='blue_btn my-4'
                    onClick={() =>
                      statusHandler(bulkOrder._id, 'head-accepted')
                    }
                  >
                    Approve
                  </button>
                  <button
                    className='trans_red_btn my-4'
                    onClick={() => statusHandler(bulkOrder._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </h2>
      </div>
    </>
  );
};

export default HeadReqOrdTwo;
