import React, { useEffect, useState } from 'react';
import Product from '../components/Products/Product';

import axios from '../api/AxiosUrl';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/item');
        const data = await result.data.data;
        console.log(result.data.data[0]);
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Products</h1>
      </div>
      <div className='flex flex-wrap justify-center my-6'>
        <Product data={products} />
      </div>
    </div>
  );
};

export default Products;
