import React from 'react';

const RequestedOrderData = (props) => {
  console.log(props.orders);

  return (
    <>
      {props.orders.length > 0 && (
        <div className='bg-gray-200 border-2 border-gray-300 rounded-lg m-4'>
          <div className='text-2xl font-semibold mx-4 my-2'>{props.name}</div>

          {props.orders.map((order) => (
            <>
              {order.status === 'pending' && (
                <>
                  <div className='borde flex justify-between mx-4'>
                    <div>name: {order.name}</div>
                    <div>quantity: {order.quantity}</div>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default RequestedOrderData;
