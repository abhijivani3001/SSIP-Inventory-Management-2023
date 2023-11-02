import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import Button from '../../components/UI/Button';

const ReqOrdSubData = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [allocatedOrderData, setAllocatedOrderData] = useState(props.orders);

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      // console.log(data);

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

  // console.log(allocatedOrderData);

  const statusHandler = async (storeManagerId, status) => {
    try {
      const res = await axios.put('api/order', { storeManagerId, status });
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className='mx-8 mt-4'>
      <div className='bg-slate-200 border-2 border-steal-200 rounded-lg m-4'>
        <div className='text-3xl font-semibold mx-6 my-4 flex justify-between'>
          <div>{props.name}</div>
          <div className='flex gap-4 mr-4'>
            <div>
              <Button
                bg='bg-green-500'
                onClick={() => statusHandler(props.userId, 'accepted')}
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                bg='bg-red-500'
                onClick={() => statusHandler(props.userId, 'rejected')}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>

        {props.orders.map((order, index) => (
          <div key={order.itemId}>
            {order.status === 'pending' && (
              <div className='border text-xl'>
                <div className='flex justify-between my-1 mx-10 gap-10'>
                  <div>{order.name}</div>
                  <div className='flex gap-4 '>
                    <div className='border border-black rounded w-20 h-7 text-center my-auto'>
                      <span className='text-sm'>x</span>
                      {order.quantity}
                    </div>
                  </div>
                </div>
                <div className='border border-gray-400 mx-8'></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReqOrdSubData;
