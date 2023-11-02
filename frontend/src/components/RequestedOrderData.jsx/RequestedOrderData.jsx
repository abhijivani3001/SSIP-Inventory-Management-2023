import React, { useState, useEffect } from 'react';
import Inventory from '../../pages/Inventory';
import axios from '../../api/AxiosUrl';
import Button from '../UI/Button';

const RequestedOrderData = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [allocatedOrderData, setAllocatedOrderData] = useState(props.orders);

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      console.log(data);
      setInventoryData(data);
      setAllocatedOrderData((prevOrderData) => {
        const updatedOrderData = prevOrderData.map((order) => {
          const item = data.find(
            (singleInventoryItem) => singleInventoryItem.itemId === order.itemId
          );
          if (item) {
            return {
              ...order,
              quantity: Math.min(order.quantity, item.quantity),
            };
          }
          return order;
        });
        return updatedOrderData;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
    console.log('Allocate quantity to selected items:', selectedItems);
  };

  const handleReject = () => {
    console.log('Reject items:', selectedItems);
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
                className='mx-3 rounded focus:outline-none active:outline-none'
              />
              Select All
            </label>
          </div>

          {props.orders.map((order, index) => (
            <div key={order.itemId}>
              {order.status === 'pending' && (
                <div className='border flex justify-between mx-11 p-1 text-lg'>
                  <div className='grid grid-cols-4'>
                    <label className='my-auto'>
                      <input
                        type='checkbox'
                        checked={selectedItems.includes(order)}
                        onChange={() => handleSelectItem(order)}
                        className='mx-3 rounded focus:outline-none active:outline-none'
                      />
                      {order.name}
                    </label>
                    <label className='mx-3 flex justify-end items-center'>
                      Allocated Quantity:
                      <input
                        type='number'
                        value={allocatedOrderData[index].quantity}
                        onChange={(e) => {
                          setAllocatedOrderData((prevOrderData) => {
                            const updatedOrderData = prevOrderData.map(
                              (item) => {
                                if (item._id === order._id) {
                                  return {
                                    ...item,
                                    quantity: e.target.value,
                                  };
                                }
                                return item;
                              }
                            );
                            return updatedOrderData;
                          });
                        }}
                        min={1}
                        className='border-2 border-gray-700 w-16 p-0 text-center mx-4 rounded'
                      />
                    </label>
                    <div className='flex'>
                      <button
                        onClick={handleAllocate}
                        className='bg-blue-600 hover:bg-blue-800 border-gray-300 border w-20 h-10 rounded text-white hover:text-gray-200'
                      >
                        Allocate
                      </button>

                      {/* pending */}
                      {/* <button
                        onClick={handleReject}
                        className="bg-red-600 hover:bg-red-800 border-red-300 border w-20 h-10 rounded text-white hover:text-gray-200 ml-3"
                      >
                        Reject
                      </button> */}
                    </div>
                  </div>
                  <div className='border border-black rounded w-20 h-7 text-center my-auto'>
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
