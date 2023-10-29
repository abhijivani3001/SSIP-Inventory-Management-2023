import React from 'react';
import ProductCard from '../UI/ProductCard';
import { useCart } from '../../store/CartProvider';

const Product = (props) => {
  const {cart,dispatch}=useCart();

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <>
      {props.data.map((val) => (
        <ProductCard
          key={val._id}
          title={val.name}
          description={val.description}
          company={val.company}
          category={val.category}
          onAddToCart={handleAddToCart.bind(null,val)}
        />
      ))}
    </>
  );
};

export default Product;