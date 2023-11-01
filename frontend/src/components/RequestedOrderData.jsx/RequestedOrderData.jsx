import React, { useState } from 'react';

const RequestedOrderData = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (order) => {
    if (selectedItems.includes(order)) {
      setSelectedItems(selectedItems.filter((item) => item !== order));
    } else {
      setSelectedItems([...selectedItems, order]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === props.orders.length) {
      // Deselect all if all are selected
      setSelectedItems([]);
    } else {
      // Select all
      setSelectedItems([...props.orders]);
    }
  };

  return (
    <>
      {props.orders.length > 0 && (
        <div className='bg-gray-200 border-2 border-gray-300 rounded-lg m-4'>
          <div className='text-2xl font-semibold mx-4 my-2'>{props.name}</div>

          {/* Display "Select All" below the username */}
          <div className='mx-4'>
            <label>
              <input
                type='checkbox'
                checked={selectedItems.length === props.orders.length}
                onChange={handleSelectAll}
              />
              Select All
            </label>
          </div>

          {props.orders.map((order) => (
            <div key={order.itemId}>
              {order.status === 'pending' && (
                <div className='border flex justify-between mx-4'>
                  <div>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectedItems.includes(order)}
                        onChange={() => handleSelectItem(order)}
                      />
                      {order.name}
                    </label>
                  </div>
                  <div>Quantity: {order.quantity}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RequestedOrderData;
