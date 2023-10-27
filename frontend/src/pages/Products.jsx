import React from 'react';
import Card from '../UI/Card';

const Products = () => {
  return (
    <div>
      <div className='mx-8 mt-4'><h1 className='text-6xl font-light'>Products</h1></div>;
      <div className='flex flex-wrap justify-center'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Products;
