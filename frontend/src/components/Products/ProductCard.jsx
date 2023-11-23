import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../store/CartProvider';

const ProductCard = (props) => {
  const [freqOfItem, setFreqOfItem] = useState(1);
  let item = props.val;

  // console.log(props.title);

  const { cart, dispatch } = useCart();

  const handleAddToCart = (masterPassword = 'none') => {
    item = { ...item, amount: +freqOfItem, masterPassword }; // (+amount) : '+' is used to convert string to int
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success('Item added to cart successfully', {
      position: 'top-right',
      autoClose: 1500,
      style: {
        marginTop: '70px',
      },
    });
  };

  const generateRandomPassword = () => {
    return (Math.random() + 1).toString(36).substring(2);
  };

  return (
    <div className='w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4'>
      <img
        className='p-8 rounded-t-lg h-48 m-auto'
        src={props.imageUrl}
        alt='product item'
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
            <button className='blue_btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={() => handleAddToCart()}>
              Add to cart
            </button>
            {props.userRole.includes('head') && (
              <button
                className='yellow_btn ml-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                onClick={() => handleAddToCart(generateRandomPassword())}
              >
                URGENT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
