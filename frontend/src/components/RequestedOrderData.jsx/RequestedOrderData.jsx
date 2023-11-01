import React, { useState } from 'react';

const RequestedOrderData = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allocationQuantity, setAllocationQuantity] = useState(0);

  const handleSelectItem = (order) => {
    if (selectedItems.includes(order)) {
      setSelectedItems(selectedItems.filter((item) => item !== order));
    } else {
      setSelectedItems([...selectedItems, order]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === props.orders.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...props.orders]);
    }
  };

  const handleAllocate = () => {
    console.log('Allocate quantity:', allocationQuantity);
  };

  const handleReject = () => {

  };

  return (
    <>
      {props.orders.length > 0 && (
        <div className='bg-gray-200 border-2 border-gray-300 rounded-lg m-4'>
          <div className='text-2xl font-semibold mx-4 my-2'>{props.name}</div>

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
                <div className='border flex justify-between mx-11 p-1 text-lg'>
                  <div className='grid grid-cols-4'>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectedItems.includes(order)}
                        onChange={() => handleSelectItem(order)}
                      />
                      {order.name}
                    </label>
                    <label className='mx-3 flex justify-end items-center'>
                      Allocate Quantity:
                      <input
                        type='number'
                        value={allocationQuantity}
                        onChange={(e) => setAllocationQuantity(e.target.value)}
                        className="w-20"
                      />
                    </label>
                    <button
                      onClick={handleAllocate}
                      className="bg-blue-600 hover:bg-blue-800 border-gray-300 border w-20 h-10 rounded text-white hover:text-gray-200"
                    >
                      Allocate
                    </button>

                    <button
                      onClick={handleReject}
                      className="bg-red-600 hover:bg-red-800 border-red-300 border w-20 h-10 rounded text-white hover:text-gray-200"
                    >
                      Reject
                    </button>

                  </div>
                  <div className="border border-black rounded w-20 h-7 text-center">
                    {order.quantity}
                  </div>
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
