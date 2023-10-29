import React from 'react';
import Card from '../UI/ProductCard';
import { useCart } from '../../store/CartProvider';

const Product = (props) => {
  return (
    <>
      {props.data.map((val) => (
        <Card
          key={val._id}
          title={val.name}
          description={val.description}
          company={val.company}
          category={val.category}
        />
      ))}
    </>
  );
};

export default Product;