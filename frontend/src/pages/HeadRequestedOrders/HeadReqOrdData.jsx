import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import Button from '../../components/UI/Button';

const HeadReqOrdData = (props) => {
  const [mergeOrderData, setMergeOrderData] = useState([]);

  const handleMergeOrder = async () => {
    const orderMap = new Map();
    props.orders.forEach((order) => {
      if (orderMap.has(order.itemId)) {
        const mapItem = orderMap.get(order.itemId);
        let updatedOrder = {
          ...mapItem,
          quantity: order.quantity + mapItem.quantity,
        };
        orderMap.set(order.itemId, updatedOrder);
      } else {
        orderMap.set(order.itemId, {
          name: order.name,
          quantity: order.quantity,
          status: order.status,
        });
      }
    });

    let ordersArray = [];
    orderMap.forEach((value, key) => {
      ordersArray.push({
        _id: key,
        itemId: key,
        quantity: value.quantity,
        name: value.name,
        status: value.status,
      });
    });

    setMergeOrderData(ordersArray);
  };

  const statusHandler = async (storeManagerId, status) => {
    try {
      const res = await axios.put('api/order', { storeManagerId, status });
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    handleMergeOrder();
  }, []);

  console.log(mergeOrderData);

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
        {mergeOrderData.map((order, index) => (
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

export default HeadReqOrdData;
