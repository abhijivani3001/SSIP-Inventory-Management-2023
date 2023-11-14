import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/AxiosUrl';

const AddInventoryCard = (props) => {
  const [freqOfItem, setFreqOfItem] = useState(1);

  const addToInventoryHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(props.itemId, freqOfItem);
      const res = await axios.post('api/inventory', [
        {
          itemId: props.itemId,
          quantity: freqOfItem,
        },
      ]);

      toast.success('Item added to inventory successfully', {
        position: 'top-right',
        autoClose: 1500,
        style: {
          marginTop: '70px',
        },
      });

      props.getInventoryItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg mx-2 my-4'>
      <img
        className='p-8 rounded-t-lg h-48 m-auto'
        src={props.imageUrl}
        alt='product image'
      />
      <div className='px-5 pb-5 mt-4'>
        <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
          {props.title}
        </h5>

        <p className='text-gray-500 text-sm my-2'>{props.description}</p>

        <div className='flex flex-col gap-1 items-center justify-between my-2 mb-0'>
          <div className='flex justify-evenly gap-2'>
            <label className='text-lg font-semibold'>Amount</label>
            <input
              id={props.id}
              name='amount'
              type='number'
              className='border-2 border-gray-700 w-12 h-7 p-0 my-auto text-center rounded-lg'
              min={1}
              value={freqOfItem}
              onChange={(e) => {
                setFreqOfItem(Math.max(1, e.target.value));
              }}
            />
          </div>

          <div className='mt-2'>
            <button className='blue_btn' onClick={addToInventoryHandler}>
              Add to Inventory
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddInventoryCard;
