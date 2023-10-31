import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/Cart/CartItem';
import Button from '../components/UI/Button';
import { useCart } from '../store/CartProvider';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/AxiosUrl';

const CartItems = () => {
  const { cart, dispatch } = useCart();
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    setIsCartEmpty(!cart.items.length);
  }, [cart]);
  console.log(isCartEmpty, cart.items);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const postElement = async (orders) => {
    try {
      const res = await axios.post('api/order', orders);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let orders = [];

    cart.items.forEach((val) => {
      orders.push({
        itemId: val._id,
        quantity: val.amount,
        delivered: 0,
        status: 'pending',
      });
    });
    postElement(orders);

    // Clear the cart
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className='mx-8 mt-4'>
      {isCartEmpty && (
        <div className='text-3xl text-center '>Your cart is empty</div>
      )}

      {/* list */}
      {!isCartEmpty && (
        <div>
          <div>
            <h1 className='text-6xl font-light'>Cart Items</h1>
          </div>
          <div className='my-6'>
            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                name={item.name}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                amount={item.amount}
              />
            ))}
          </div>
          <div className='text-center my-4'>
            <Button onClick={submitHandler}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
