import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import { toast } from 'react-toastify';

const StoreManReqOrdThree = (props) => {
  console.log(props.masterPassword ? 'y' : 'n');
  const [inventoryData, setInventoryData] = useState([]);
  const [allocationQuantity, setAllocationQuantity] = useState(0);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      setInventoryData(data);
      const currentOrderInventoryQuantity =
        data?.find(
          (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
        )?.quantity || 0;
      setAllocationQuantity(
        Math.min(
          currentOrderInventoryQuantity,
          props.quantity - props.delivered
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAllocationQuantity = (e) => {
    const currentOrderInventoryQuantity =
      inventoryData?.find(
        (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
      )?.quantity || 0;
    const allocationQuantityUpperBound = Math.min(
      currentOrderInventoryQuantity,
      props.quantity - props.delivered
    );
    setAllocationQuantity(
      Math.min(Math.max(e.target.value, 0), allocationQuantityUpperBound)
    );
  };

  const postNotification = async (message) => {
    try {
      const res = await axios.post('/api/notification', {
        receiverId: props.userId,
        message: message,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const submitAllocation = async (status) => {
    try {
      console.log('reject');
      if (
        status === 'rejected' &&
        !window.confirm('DO YOU WANT TO REJECT ORDER')
      )
        return;

      if (status === 'rejected') {
        const res = await axios.put(
          `api/order/${props.bulkOrderId}/${props.orderId}`,
          {
            user_id: props.userId,
            status: 'rejected',
          }
        );
        console.log(res);

        postNotification('Your order is Rejected by Branch Store Manager'); // send notification to below user

        toast.success('Order Rejected Successfully', {
          autoClose: 1500,
        });

        props.getRequiredUserData(); // to refresh the page
        getInventoryItemsQuantity(); // to update available inventory items
        return;
      }

      // --- status!=='rejected' ---
      let inventoryItemQuantity, inventoryId;
      inventoryData.forEach((item) => {
        if (item.itemId === props.itemId) {
          inventoryItemQuantity = item.quantity;
          inventoryId = item._id;
        }
      });

      if (inventoryItemQuantity - allocationQuantity < 10) {
        console.log(props.masterPassword);
        if (!props.masterPassword || props.masterPassword === 'none') {
          toast.error('Items cannot be allocated.', {
            autoClose: 1500,
          });
          return;
        }

        if (!window.confirm('Are you sure you want to allocate items?')) {
          toast.error('Order not allocated.', {
            autoClose: 1500,
          });
          return;
        }
      }

      // update inventory
      const res = await axios.put('api/inventory', {
        updatedQuantity: inventoryItemQuantity - allocationQuantity,
        inventoryId,
      });

      let orderOptions = {
        user_id: props.userId,
        delivered: allocationQuantity,
      };
      if (props.quantity === props.delivered + allocationQuantity) {
        orderOptions = { ...orderOptions, status: 'accepted' };
      }

      // allocate item
      const res2 = await axios.put(
        `api/order/${props.bulkOrderId}/${props.orderId}`,
        {
          ...orderOptions,
        }
      );

      postNotification('Your requeted item is allocated to you successfully');

      toast.success('Item allocated Successfully', {
        autoClose: 1500,
      });

      props.getRequiredUserData();
      getInventoryItemsQuantity();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  return (
    <>
      <tr
        className={`${
          props.masterPassword !== 'none'
            ? 'bg-red-50 text-red-800 hover:bg-red-100'
            : 'bg-white text-gray-900 hover:bg-gray-50'
        } border-b divide-x `}
      >
        <th
          scope='row'
          className='flex items-center px-4 py-1 whitespace-nowrap'
        >
          <div className='text-base font-semibold flex gap-2'>
            <div>
              <img
                className='p-2 h-16 w-24 object-contain'
                src={props.imageUrl}
                alt='productimage'
              />
            </div>
            {props.masterPassword !== 'none' ? (
              <div className='my-auto font-bold text-red-800'>{props.name}*</div>
            ) : <div className='my-auto'>{props.name}</div>}
          </div>
        </th>

        <td className='px-6'>{props.quantity}</td>

        <td className='px-6'>{props.delivered}</td>

        <td className='px-6'>
          {inventoryData?.find(
            (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
          )?.quantity || 0}
        </td>

        {(props.currentStatus === 'pending' ||
          props.currentStatus === 'accepted') && (
          <td className='px-6 w-80'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <input
                  type='number'
                  value={allocationQuantity}
                  onChange={handleAllocationQuantity}
                  className='border-2 border-gray-700 w-12 h-8 p-0 my-auto text-center rounded-lg'
                />
                <button
                  className={`blue_btn ${
                    allocationQuantity !== props.quantity
                      ? 'disabled:opacity-20 disabled:bg-gray-600 cursor-not-allowed hover:bg-gray-600'
                      : ''
                  }`}
                  disabled={allocationQuantity !== props.quantity}
                  onClick={() => submitAllocation('accepted')}
                >
                  Allocate
                </button>
              </div>
              <button
                className={`${
                  props.quantity === props.delivered
                    ? 'trans_rejected_btn'
                    : 'trans_red_btn'
                }`}
                disabled={props.quantity === props.delivered}
                onClick={() => submitAllocation('rejected')}
              >
                Reject
              </button>
            </div>
          </td>
        )}
      </tr>
    </>
  );
};

export default StoreManReqOrdThree;
