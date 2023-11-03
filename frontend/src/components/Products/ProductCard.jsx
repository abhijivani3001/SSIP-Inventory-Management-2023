import React, { useContext, useEffect, useState } from 'react';
import Button from '../UI/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = (props) => {
  const [freqOfItem, setFreqOfItem] = useState(1);

  const incrementHandler = () => {
    setFreqOfItem((prev) => prev + 1);
  };
  const decrementHandler = () => {
    if (freqOfItem > 1) setFreqOfItem((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    props.onAddToCart();

    toast.success('Item added to cart successfully', {
      position: 'top-right',
      autoClose: 1500,
      style: {
        marginTop: '70px',
      },
    });
  };

  return (
    <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4'>
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
              className='border-2 border-gray-700 w-12 p-0 text-center rounded-lg'
              min={1}
              value={freqOfItem}
              onChange={(e) => {
                setFreqOfItem(e.target.value);
                props.amountChangeHandler(e.target.value);
              }}
            />
          </div>

          <div className='mt-2'>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
