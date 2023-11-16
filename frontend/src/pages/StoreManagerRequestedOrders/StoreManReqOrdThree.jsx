import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import { toast } from 'react-toastify';

const StoreManReqOrdThree = (props) => {
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

  const submitAllocation = async (status) => {
    try {
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
        toast.success('Order Rejected Successfully', {
          autoClose: 1500,
        });
        props.getRequiredUserData();
        getInventoryItemsQuantity();
        return;
      }
      let inventoryItemQuantity, inventoryId;
      inventoryData.forEach((item) => {
        if (item.itemId === props.itemId) {
          inventoryItemQuantity = item.quantity;
          inventoryId = item._id;
        }
      });

      if (inventoryItemQuantity - allocationQuantity < 10) {
        const password = window.prompt('Enter Password');
        const MASTER_PASSWORD = 12345;

        if (password !== MASTER_PASSWORD) {
          toast.error('Incorrect password. Order not allocated.', {
            autoClose: 1500,
          });
          return;
        }
      }

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
      const res2 = await axios.put(
        `api/order/${props.bulkOrderId}/${props.orderId}`,
        {
          ...orderOptions,
        }
      );
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
      <tr className="bg-white border-b divide-x hover:bg-gray-50">
        <th
          scope="row"
          className="flex items-center px-4 py-1 text-gray-900 whitespace-nowrap"
        >
          <div className="text-base font-semibold flex gap-2">
            <div>
              <img
                className="p-2 h-16 w-24 object-contain"
                src={props.imageUrl}
                alt="productimage"
              />
            </div>
            <div className="my-auto">{props.name}</div>
          </div>
        </th>

        <td className="px-6">{props.quantity}</td>

        <td className="px-6">{props.delivered}</td>

        <td className="px-6">
          {inventoryData?.find(
            (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
          )?.quantity || 0}
        </td>

        {(props.currentStatus === 'pending' ||
          props.currentStatus === 'accepted') && (
          <td className="px-6 w-80">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={allocationQuantity}
                  onChange={handleAllocationQuantity}
                  className="border-2 border-gray-700 w-12 h-8 p-0 my-auto text-center rounded-lg"
                />
                <button
                  // className={`text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none ${
                  //   allocationQuantity === props.quantity
                  //     ? ''
                  //     : 'disabled:opacity-20 bg-gray-600 disabled:bg-gray-600 cursor-not-allowed hover:bg-gray-600 '
                  // }`}
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
                className="trans_red_btn"
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
