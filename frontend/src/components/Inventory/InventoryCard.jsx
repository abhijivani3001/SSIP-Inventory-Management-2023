import React, { useState } from 'react';
import { toast } from 'react-toastify';

import axios from '../../api/AxiosUrl';

const InventoryCard = (props) => {
  const [availableItems, setAvailableItems] = useState(props.quantity);
  const [isEditing, setIsEditing] = useState(false);

  const isLowQuantity = availableItems < props.minValue;

  const handleUpdateClick = () => {
    setIsEditing(!isEditing);
    setAvailableItems(props.quantity);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const res = await axios.put('api/inventory', {
        updatedQuantity: availableItems,
        inventoryId: props.inventoryId,
      });
      toast.success('Item updated Successfully', {
        autoClose: 1500,
      });
      props.getInventoryItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItemHandler = async () => {
    try {
      const res = await axios.delete(`api/inventory/${props.inventoryId}`);
      props.getInventoryItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4'>
        <img
          className='p-8 rounded-t-lg h-48 m-auto'
          src={props.imageUrl}
          alt='inventory'
        />
        <div className='px-5 pb-5 mt-4'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
            {isLowQuantity ? (
              <span
                title='Item quantity is low'
                className='text-red-700 hover:text-red-800 cursor-help'
              >
                {props.name} {' *'}
              </span>
            ) : (
              props.name
            )}
          </h5>

          <p className='text-gray-500 text-sm my-2'>{props.description}</p>

          <div className='flex flex-col gap-1 items-center justify-between my-2 mb-0'>
            <div className='flex justify-evenly gap-2'>
              <label className='text-lg font-semibold' htmlFor={props.id}>
                Quantity
              </label>
              {isEditing ? (
                <input
                  id={props.id}
                  name='quantity'
                  type='number'
                  className='border-2 border-gray-700 w-12 h-7 p-0 my-auto text-center rounded-lg'
                  min={1}
                  value={availableItems}
                  onChange={(e) =>
                    setAvailableItems(Math.max(1, e.target.value))
                  }
                />
              ) : (
                <span className='my-auto'>{props.quantity}</span>
              )}
            </div>

            <div className='flex justify-center gap-6 font-medium text-gray-600'>
              <div>Min: {props.minValue}</div>
              <div>Max: {props.maxValue}</div>
            </div>

            <div className='border h-[1px] w-full border-gray-500 bg-gray-200'></div>

            <div className='mt-2 mx-2 flex gap-2'>
              {isEditing ? (
                <button className='blue_btn' onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className='green_btn' onClick={handleUpdateClick}>
                  Update
                </button>
              )}
              <button className='red_btn' onClick={deleteItemHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryCard;
