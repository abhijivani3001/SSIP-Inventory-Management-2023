import React, { useState } from 'react';
import { useCart } from '../../store/CartProvider';

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);
  const { cart, dispatch } = useCart();
  console.log(props.item);
  const incrementHandler = (item) => {
    setAmount(+amount + 1);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { ...item, amount: Math.max(0, item.amount + 1) },
    });
  };

  const decrementHandler = (item) => {
    if (amount > 1) {
      setAmount(+amount - 1);
      dispatch({
        type: 'UPDATE_ITEM',
        payload: { ...item, amount: Math.max(0, item.amount - 1) },
      });
    }
  };

  return (
    <>
      <div className='border-2 flex justify-between border-gray-300 bg-white rounded-lg my-2 px-2'>
        <div className='flex gap-4 my-1'>
          <img
            className='p-2 h-16 w-24 object-contain'
            src={props.item.imageUrl}
            alt='cart'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            {props.name}
          </h5>
          {props.item.masterPassword !== 'none' && (
            <div className='flex items-center'>
              <div className='text-white bg-yellow-300 hover:bg-yellow-400 text-xs p-1 rounded'>
                URGENT
              </div>
              <div className='ml-2'>
                Master Password: {props.item.masterPassword}
              </div>
            </div>
          )}
        </div>

        <div className='flex align-middle my-auto gap-2 mr-6'>
          <button
            className='red_btn mx-4'
            onClick={() => props.onRemoveFromCart(props.item)}
          >
            Delete
          </button>
          <button
            className='gray_btn'
            onClick={() => decrementHandler(props.item)}
          >
            -
          </button>
          <div className='my-auto'>{amount}</div>
          <button
            className='gray_btn'
            onClick={() => incrementHandler(props.item)}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
