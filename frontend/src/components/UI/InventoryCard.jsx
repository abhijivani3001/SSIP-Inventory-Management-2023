import React, { useState } from 'react';
import Button from './Button';

const InventoryCard = (props) => {
  const [availableItems, setAvailableItems] = useState(props.quantity);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4'>
        <img
          className='p-8 rounded-t-lg h-48 m-auto'
          src='https://flowbite.com/docs/images/products/apple-watch.png'
          alt='product image'
        />
        <div className='px-5 pb-5 mt-4'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
            {props.name}
          </h5>
          <p className='text-gray-500 text-sm my-2'>{props.description}</p>

          <div className='flex flex-col gap-1 items-center justify-between my-2 mb-0'>
            <div className='flex justify-evenly gap-2'>
              <label className='text-lg font-semibold' htmlFor={props.id}>Quantity</label>
              {isEditing ? (
                <input
                  id={props.id}
                  name='quantity'
                  type='number'
                  className='border-2 border-gray-700 w-12 text-center rounded-lg'
                  min={1}
                  value={availableItems}
                  onChange={(e) => setAvailableItems(e.target.value)}
                />
              ) : (
                <span>{props.quantity}</span>
              )}
            </div>

            <div className='mt-2'>
              {isEditing ? (
                <Button onClick={handleSaveClick}>Save</Button>
              ) : (
                <Button onClick={handleUpdateClick}>Update</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryCard;
