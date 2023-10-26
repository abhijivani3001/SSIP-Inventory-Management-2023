import React from 'react';
import Card from '../UI/Card';

const Products = () => {
  return (
    <div>
      <div className='flex'>
        <div className=' text-3xl text-gray-800 font-semibold'>Products</div>
      </div>
      <div className='border border-gray-600'></div>
      <div className='flex flex-wrap justify-center'>
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
