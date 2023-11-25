import axios from '../../api/AxiosUrl';
import React from 'react';
import { toast } from 'react-toastify';

const PlacedOrder = (props) => {
  const handleReceivedClick = async () => {
    const res = await axios.get('/api/user');
    const user = res.data.user;

    try {
      // update status of order in placed order
      const res2 = await axios.put(
        `api/order/${props.bulkOrderId}/${props.orderId}`,
        {
          status: 'completed',
          user_id: user._id,
        }
      );

      // to update inventory
      try {
        const res3 = await axios.post('api/inventory', [
          {
            itemId: props.itemId,
            quantity: props.delivered,
          },
        ]);

        toast.success('Item updated to inventory Successfully', {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
    props.getOrders();
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
                {props.currentStatus !== 'super' && (
                  <div
                    className='flex items-center text-blue-500'
                    onClick={handleReceivedClick}
                  >
                    Received?
                  </div>
                )}
                {props.currentStatus === 'super' && (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-yellow-300 mr-2'></div>
                    Allocated
                  </div>
                )}
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

            {props.status === 'pending' && !isAllQuantityReceived && (
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-yellow-300 mr-2'></div>
                Pending
              </div>
            )}

            {(props.status === 'head-accepted' ||
              (props.status === 'accepted' && !isAllQuantityReceived)) && (
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-green-300 mr-2'></div>
                Accepted
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default PlacedOrder;
