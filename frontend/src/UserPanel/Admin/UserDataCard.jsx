import React from 'react';

const UserDataCard = (props) => {
  return (
    <div>
      <div>
        {props.user.name}{' '}
        <span className='text-gray-500 text-xl'>({props.user.role})</span>{' '}
      </div>
      <div className='text-xl ml-5'>
        Branch:{' '}
        <span className='text-gray-500 text-xl'>{props.user.branch}</span>
      </div>

      <div className='text-xl ml-5'>
        {/* <div> */}
          Email:{' '}
          <span className='text-gray-500 mr-14 text-xl'>{props.user.email}</span>
        {/* </div> */}
        {/* <div> */}
          Phone:{' '}
          <span className='text-gray-500 text-xl'>{props.user.phone}</span>
        {/* </div> */}
      </div>

      {/* <div className='text-2xl ml-5'>Orders</div>
      <div className='text-lg '>
        <div className='my-4'>
          {props.user.orders?.map((order) => (
            <div className=''>
            <div className='border  border-gray-600 mx-2'></div>
              <div className='ml-10'>Date: {order.createdOn} <span className='mx-5'></span> OrderId: {order._id} </div>
              <div className='ml-10'>Name: {order.name}</div>
              <div className='ml-10'>Company: {order.company}</div>
              <div className='ml-10'>Category: {order.category}</div>
              <div className='ml-10'>Quantity: {order.quantity}</div>
              <div className='ml-10'>Delivered: {order.delivered}</div>
            </div>
          ))}
          <div className='border border-black my-4'></div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default UserDataCard;
