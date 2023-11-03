import axios from '../../api/AxiosUrl';
import React, { useState } from 'react';

const PlacedOrder = (props) => {
  const [isItemReceived, setIsItemReceived] = useState(false);

  const handleReceivedClick = async () => {
    setIsItemReceived(true);
    const res = await axios.get('/api/user');

    try {
      const response = await axios.put(`api/order/${props.orderId}`, {
        status: 'completed',
        user_id: res.data.user._id
      });

      if (response.status === 200) {
        console.log('Order status updated successfully');
      } else {
        console.error('Error updating order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Conditionally render the "Received?" button based on props.quantity and props.delivered
  const shouldRenderReceivedButton = props.quantity === props.delivered;

  return (
    <>
      <div className={`border-2 flex justify-between border-gray-300 bg-white rounded-lg mb-2 mx-6 ${isItemReceived ? 'bg-green-100' : ''}`}>
        <div className='flex gap-4'>
          <img
            className='p-4 h-20'
            src={props.imageUrl}
            alt='productimage'
          />
          <h5 className={`text-xl my-auto font-semibold tracking-tight text-gray-900 ${isItemReceived ? 'text-green-700' : ''}`}>
            {props.name}
          </h5>
        </div>
        {props.status === 'accepted' && !isItemReceived && shouldRenderReceivedButton && (
          <button
            className='bg-green-500 text-white px-3 py-1 rounded'
            onClick={handleReceivedClick}
          >
            Received?
          </button>
        )}
        <div className='flex my-auto gap-14 mr-8'>
          <div className='mr-10'>{props.quantity}</div>
          <div className='mr-2'>{props.delivered}</div>
          <div className={`${props.status === 'completed' ? 'text-green-500' : ''}`}>
            {isItemReceived ? 'Completed' : props.status}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default PlacedOrder;
