import React from 'react';
import ProductCard from './ProductCard';

const Product = (props) => {
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
          val={val}
        />
      ))}
    </>
  );
};

export default Product;
