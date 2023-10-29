import React from 'react';
import Card from '../UI/Card';

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
