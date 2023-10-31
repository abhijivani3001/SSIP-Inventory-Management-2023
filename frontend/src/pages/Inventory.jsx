import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/UI/InventoryCard';

import axios from '../api/AxiosUrl';

const Inventory = () => {
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryProductsAvailable, setIsInventoryProductsAvailable] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/inventory');
        const data = await result.data.inventory;
        console.log(data);

        if (data.length) setIsInventoryProductsAvailable(true);
        else setIsInventoryProductsAvailable(false);
        setInventoryProducts(data);
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
      {!isLoading && !isInventoryProductsAvailable && (
        <div className='text-3xl text-center '>Products is not available</div>
      )}

      {!isLoading && <>
        <div>
          <h1 className='text-6xl font-light'>Inventory</h1>
        </div>
        <div className='flex flex-wrap justify-center my-6'>
          {inventoryProducts.map((val) => (
            <InventoryCard
              key={val._id}
              name={val.name}
              description={val.description}
              company={val.company}
              category={val.category}
              imageUrl={val.imageUrl}
              quantity={val.quantity}
            />
          ))}
        </div>
      </>}
    </div>
  );
};

export default Inventory;
