import React, { useEffect, useState } from 'react';
import CartItem from '../components/Cart/CartItem';
import { useCart } from '../store/CartProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/AxiosUrl';
import ROLES from '../constants/ROLES';

const CartItems = () => {
  const { cart, dispatch } = useCart();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [currentUserData, setCurrentUserData] = useState();

  const getCurrentUser = async () => {
    try {
      const res = await axios.get('/api/user');
      const data = await res.data.user;
      setCurrentUserData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const clearCartOnReload = (event) => {
    if (cart?.items?.length > 0) {
      const confirmationMessage =
        'If you reload the page, your cart will become empty. Do you want to continue?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };

  useEffect(() => {
    setIsCartEmpty(!cart?.items?.length);

    window.addEventListener('beforeunload', clearCartOnReload);

    return () => {
      window.removeEventListener('beforeunload', clearCartOnReload);
    };
  }, [cart]);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const postElement = async (orders) => {
    try {
      console.log(orders);
      const res = await axios.post('api/order', orders);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postNotification = async (message, receiverId, up) => {
    try {
      const res = await axios.post('/api/notification', {
        receiverId: receiverId,
        message: message,
        up: up,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    toast.success('Order placed successfully!', {
      autoClose: 1000,
    });

    let orders = [];

    cart.items.forEach((val) => {
      orders.push({
        itemId: val._id,
        quantity: val.amount,
        delivered: 0,
        status: 'pending',
        masterPassword: val.masterPassword,
      });
    });

    let up = true;
    if (
      currentUserData.role === ROLES.SUB_BRANCH_HEAD ||
      currentUserData.role === ROLES.BRANCH_HEAD ||
      currentUserData.role === ROLES.DEPARTMENT_HEAD
    ) {
      up = false;
    }
    postNotification('You have got a new order', '', up);

    postElement(orders);

    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className='mx-8 mt-4'>
      {isCartEmpty && <div className='not_available'>Your cart is empty</div>}

      {!isCartEmpty && (
        <div>
          <div>
            <h1 className='page-title'>Cart Items</h1>
          </div>
          <div className='my-6'>
            {cart?.items.map((item) => (
              <CartItem
                key={item._id}
                name={item.name}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                amount={item.amount}
                item={item}
              />
            ))}
          </div>
          <div className='flex gap-4 justify-center'>
            <div className='text-center my-4'>
              <button
                className='trans_btn'
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear
              </button>
            </div>
            <div className='text-center my-4'>
              <button className='green_btn' onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CartItems;
