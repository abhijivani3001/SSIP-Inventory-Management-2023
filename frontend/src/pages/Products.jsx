import React from 'react';
import Card from '../UI/Card';

const Products = () => {
  return (
    <div className='mx-8 mt-4'>
      <div><h1 className='text-6xl font-light'>Products</h1></div>
      <div className='flex flex-wrap justify-center my-6'>
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
