import React, { useState, useEffect } from 'react';
import Inventory from '../Inventory';
import axios from '../../api/AxiosUrl';
import Button from '../../components/UI/Button';

const StoreReqOrdData = (props) => {
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
          return { order, quantity: 0 };
        });
        return updatedOrderData;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAllocate = async (id, quantity) => {
    try {
      let q, tempId; // q=quantity of inventory item, tempId=inventory Id in which we want to update quantity
      inventoryData.map((item) => {
        if (item.itemId === id) {
          q = item.quantity;
          tempId = item._id;
        }
      });
      // console.log(q - quantity);

      const res = await axios.put('api/inventory', {
        updatedQuantity: q - quantity,
        inventoryId: tempId,
      });
      // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReject = () => {
    console.log('Reject items:', selectedItems);
  };

  return (
    <>
      {props.orders.length > 0 && (
        <div className='bg-gray-200 border-2 border-gray-300 rounded-lg m-4'>
          <div className='text-2xl font-semibold mx-4 my-2'>{props.name}</div>

          {props.orders.map((order, index) => (
            <div key={order.itemId}>
              {order.status === 'pending' && (
                <div className='border flex justify-between mx-11 p-1 text-lg'>
                  <div className='grid grid-cols-4'>
                    <div>{order.name}</div>
                    <div className='border border-black rounded w-20 h-7 text-center my-auto'>
                      <span className='text-sm'>x</span>
                      {order.quantity}
                    </div>

                    <label className='mx-3 flex justify-end items-center'>
                      Allocate Quantity:
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
                                    quantity: Math.min(
                                      e.target.value,
                                      order.quantity
                                    ),
                                  };
                                }
                                return item;
                              }
                            );
                            return updatedOrderData;
                          });
                        }}
                        min={0}
                        className='border-2 border-gray-700 w-16 p-0 text-center mx-4 rounded'
                        max={order.quantity}
                      />
                    </label>
                    <div className='flex'>
                      <button
                        onClick={() =>
                          handleAllocate(
                            order.itemId,
                            allocatedOrderData[index].quantity
                          )
                        }
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StoreReqOrdData;
