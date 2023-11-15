import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
import { ToastContainer, toast } from 'react-toastify';

const MASTER_PASSWORD = '123'; // Hardcoded master password

const StoreReqOrdData = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [allocatedOrderData, setAllocatedOrderData] = useState(props.orders);
  const [passwordVerified, setPasswordVerified] = useState(false);

  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      setInventoryData(data);
      setAllocatedOrderData((prevOrderData) => {
        const updatedOrderData = props.orders.map((order) => {
          const inventoryItem = data.find(
            (singleInventoryItem) => singleInventoryItem.itemId === order.itemId
          );
          if (inventoryItem) {
            return {
              ...order,
              quantity: Math.min(
                order.quantity - order.delivered,
                inventoryItem.quantity
              ),
            };
          }
          return { ...order, quantity: 0 };
        });
        return updatedOrderData;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAllocate = async (id, orderId, quantityToBeDelivered) => {
    try {
      if (quantityToBeDelivered <= 0) {
        return toast.success('Allocate Quantity should be > 0', {
          autoClose: 1500,
        });
      }
      let inventoryItemQuantity, tempId;
      inventoryData.forEach((item) => {
        if (item.itemId === id) {
          inventoryItemQuantity = item.quantity;
          tempId = item._id;
        }
      });

      if (inventoryItemQuantity - quantityToBeDelivered < 10) {
        // Prompt for password only if inventory is less than 10
        const password = window.prompt('Enter Password');

        if (password === MASTER_PASSWORD) {
          // If the password is correct (123 in this case)
          setPasswordVerified(true);
        } else {
          toast.error('Incorrect password. Order not allocated.', {
            autoClose: 1500,
          });
          return;
        }
      }

      if (passwordVerified) {
        const res = await axios.put('api/inventory', {
          updatedQuantity: inventoryItemQuantity - quantityToBeDelivered,
          inventoryId: tempId,
        });

        const res2 = await axios.put(`api/order/${orderId}`, {
          user_id: props.userId,
          status: 'accepted',
          delivered: quantityToBeDelivered,
        });
        toast.success('Item allocated Successfully', {
          autoClose: 1500,
        });
        props.getRequiredData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {props.orders.length > 0 && (
        <div className='bg-gray-200 border-2 border-gray-300 rounded-lg m-4'>
          <div className='flex justify-between'>
            <div className='flex align-middle'>
              <div className='text-2xl font-semibold mx-4 my-2'>
                {props.name}
              </div>
              <div className='text-xl font-medium text-gray-500 my-2'>
                Orders x{props.orders.length}
              </div>
            </div>
            <div>Created at: {props.orders.createdAt}</div>
          </div>

          {props.orders.map((order, index) => (
            <div key={order.itemId}>
              {(order.status === 'accepted' || order.status === 'pending') && (
                <div className='border flex justify-between mx-11 p-1 text-lg'>
                  <div className='grid grid-cols-5 w-full'>
                    <div>{order.name}</div>

                    <div className='flex items-center'>
                      <div className='border border-black rounded w-20 h-7 text-center my-auto'>
                        <span className='text-sm'>x</span>
                        {order.quantity - order.delivered}
                      </div>
                      <span className='ml-3'>
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <label className='mx-3 flex justify-end items-center'>
                      Allocate Qty:
                      <input
                        type='number'
                        value={allocatedOrderData[index].quantity}
                        onChange={(e) => {
                          setAllocatedOrderData((prevOrderData) => {
                            const updatedOrderData = prevOrderData.map(
                              (item) => {
                                const inventoryItem = inventoryData.find(
                                  (singleInventoryItem) =>
                                    singleInventoryItem.itemId === order.itemId
                                );
                                if (item._id === order._id) {
                                  return {
                                    ...item,
                                    quantity: Math.min(
                                      e.target.value,
                                      Math.min(
                                        order.quantity - order.delivered,
                                        inventoryItem.quantity
                                      )
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
                      />
                    </label>

                    <div className='flex w-auto'>
                      <button
                        onClick={() =>
                          handleAllocate(
                            order.itemId,
                            order._id,
                            allocatedOrderData[index].quantity
                          )
                        }
                        className={`blue_btn ${order.quantity - order.delivered !==
                            allocatedOrderData[index].quantity ||
                            allocatedOrderData[index].quantity === 0
                            ? 'disabled:opacity-20 disabled:bg-gray-600 cursor-not-allowed hover:bg-gray-600'
                            : ''
                          }`}
                        disabled={
                          order.quantity - order.delivered !==
                          allocatedOrderData[index].quantity ||
                          allocatedOrderData[index].quantity === 0
                        }
                      >
                        Allocate
                      </button>
                    </div>

                    <div className='border border-black rounded w-20 h-7 text-center my-auto ml-auto'>
                      <span className='text-sm'>x</span>
                      {inventoryData.find(
                        (singleInventoryItem) =>
                          singleInventoryItem.itemId === order.itemId
                      )?.quantity || 0}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default StoreReqOrdData;
