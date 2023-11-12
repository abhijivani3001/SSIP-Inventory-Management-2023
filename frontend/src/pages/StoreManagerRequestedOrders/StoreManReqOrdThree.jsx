import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';

const StoreManReqOrdThree = (props) => {
  const [inventoryData, setInventoryData] = useState([]);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      setInventoryData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  return (
    <>
      <tr class='bg-white border-b divide-x dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <th
          scope='row'
          class='flex items-center px-4 py-1 text-gray-900 whitespace-nowrap dark:text-white'
        >
          <div class='text-base font-semibold flex gap-2'>
            <div>
              <img
                className='p-2 h-16 w-24 object-contain'
                src={props.imageUrl}
                alt='productimage'
              />
            </div>
            <div className='my-auto'>{props.name}</div>
          </div>
        </th>

        <td class='px-6'>{props.quantity}</td>

        <td class='px-6'>{props.delivered}</td>

        <td class='px-6'>
          {inventoryData?.find(
            (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
          )?.quantity || 0}
        </td>

        <td class='px-6'>
          <div className='flex justify-between'>
            <button className='blue_btn'>Allocate</button>
            <button className='trans_red_btn'>Reject</button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StoreManReqOrdThree;
