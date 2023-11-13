import axios from '../../api/AxiosUrl';
import React from 'react';

const PlacedOrder = (props) => {
  const handleReceivedClick = async () => {
    const res = await axios.get('/api/user');
    try {
      const response = await axios.put(
        `api/order/${props.bulkOrderId}/${props.orderId}`,
        {
          status: 'completed',
          user_id: res.data.user._id,
        }
      );

      if (response.status === 200) {
        console.log('Order status updated successfully');
        props.getOrders();
      } else {
        console.error('Error updating order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const isAllQuantityReceived = props.quantity === props.delivered;

  return (
    <>
      <tr class='bg-white border-b divide-x dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <th
          scope='row'
          class='flex items-center px-4 py-1 text-gray-900 whitespace-nowrap dark:text-white'
        >
          <div class='text-base font-semibold flex gap-2'>
            <div>
              <img
                className='p-2 h-16 w-24 object-contain'
                src={props.imageUrl}
                alt='productimage'
              />
            </div>
            <div className='my-auto'>{props.name}</div>
          </div>
        </th>
        <td class='px-6'>{props.quantity}</td>
        <td class='px-6'>{props.delivered}</td>
        <td class='px-6'>
          <div class='flex items-center'>
            {props.status === 'accepted' && isAllQuantityReceived && (
              <button>
                <div
                  className='flex items-center text-blue-500'
                  onClick={handleReceivedClick}
                >
                  Received?
                </div>
              </button>
            )}

            {props.status === 'completed' && (
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                Completed
              </div>
            )}

            {props.status === 'rejected' && (
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                Rejected
              </div>
            )}

            {((props.status === 'pending' && !isAllQuantityReceived) ||
              (props.status === 'accepted' && !isAllQuantityReceived)) && (
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-yellow-300 mr-2'></div>
                Pending
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default PlacedOrder;
