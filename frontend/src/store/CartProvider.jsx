import { useReducer, useContext } from 'react';

import CartContext from './cart-context';

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let flag = false;
      const updatedItemsArray = state.items.map((item) => {
        if (item.name === action.payload.name) {
          flag = true;
          return { ...item, amount: item.amount + action.payload.amount };
        }
        return item;
      });
      if (flag === false) updatedItemsArray.push(action.payload);
      return {
        ...state,
        items: updatedItemsArray,
      };
    case 'REMOVE_ITEM':
      const updatedItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, items: updatedItems };
    case 'UPDATE_ITEM':
      const updatedItemsArray2 = state.items.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, amount: action.payload.amount };
        }
        return item;
      });
      return {
        ...state,
        items: updatedItemsArray2,
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return initialState;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
