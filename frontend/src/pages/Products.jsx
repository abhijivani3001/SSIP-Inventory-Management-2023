import React, { useEffect, useState } from 'react';
import Product from '../components/Products/Product';

import axios from '../api/AxiosUrl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/item');
        const data = await result.data.items;
        // console.log(data);

        const finalData = data.map((item) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 30) + '...';
          }
          return item;
        });
        setProducts(finalData);

        if (finalData.length) setIsProductsAvailable(true);
        else setIsProductsAvailable(false);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isProductsAvailable && (
        <div className='text-3xl text-center '>Products is not available</div>
      )}

      {!isLoading && isProductsAvailable && (
        <>
          <div>
            <h1 className='text-6xl font-light'>Products</h1>
          </div>
          <div className='flex flex-wrap justify-center my-6'>
            <Product data={products} />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
