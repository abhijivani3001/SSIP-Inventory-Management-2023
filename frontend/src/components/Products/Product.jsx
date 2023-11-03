import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../../store/CartProvider';

const Product = (props) => {
  const { cart, dispatch } = useCart();
  const [amount, setAmount] = useState(1);

  const amountChangeHandler = (val) => {
    setAmount(val);
  };

  const handleAddToCart = (item) => {
    item = { ...item, amount: (+amount) }; // (+amount) : '+' is used to convert string to int
    // console.log(item);
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <>
      {props.data.map((val) => (
        <ProductCard
          key={val._id}
          title={val.name}
          imageUrl={val.imageUrl}
          description={val.description}
          company={val.company}
          category={val.category}
          // onAddToCart={handleAddToCart.bind(null, val)}
          onAddToCart={()=>handleAddToCart(val)}
          amountChangeHandler={amountChangeHandler}
        />
      ))}
    </>
  );
};

export default Product;
