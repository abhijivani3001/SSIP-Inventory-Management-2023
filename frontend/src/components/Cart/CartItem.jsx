import React, { useState } from 'react';
import { useCart } from '../../store/CartProvider';

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);
  const { cart, dispatch } = useCart();

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
      <div className='border-2 flex justify-between border-gray-300 bg-white rounded-lg my-2'>
        <div className='flex gap-4 m-2'>
          <img
            className='p-2 h-16 w-24 object-contain'
            src={props.item.imageUrl}
            alt='cart'
          />
          <h5 className='text-xl my-auto font-semibold tracking-tight text-gray-900'>
            {props.name}
          </h5>
        </div>

        <div className='flex align-middle my-auto gap-2 mr-8'>
          <button
            className='red_btn mt-2'
            onClick={() => props.onRemoveFromCart(props.item)}
          >
            Delete
          </button>
          <button
            className='gray_btn mt-2'
            onClick={() => decrementHandler(props.item)}
          >
            -
          </button>
          <div className='my-auto mx-0'>{amount}</div>
          <button
            className='gray_btn mt-2'
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
