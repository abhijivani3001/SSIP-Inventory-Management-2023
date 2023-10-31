import React, { useEffect, useState } from 'react';

import axios from '../../api/AxiosUrl';
import Button from '../UI/Button';
import AddInventoryCard from './AddInventoryCard';

const AddInventoryItemsContent = (props) => {
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
            item.description = item.description.slice(0, 25) + '...';
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
    <div className='mx-8'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isProductsAvailable && (
        <div className='text-3xl text-center '>Products is not available</div>
      )}

      {!isLoading && isProductsAvailable && (
        <>
          <div>
            <h1 className='text-4xl font-light'>Add Products to Inventory</h1>
          </div>
          <div className='flex flex-wrap justify-center my-3'>
            {products.map((val) => (
              <AddInventoryCard
                key={val._id}
                title={val.name}
                description={val.description}
                company={val.company}
                category={val.category}
              />
            ))}
          </div>
          <div className='flex gap-4 justify-center'>
            <Button onClick={props.onClose}>close</Button>
            {/* <Button onClick={props.onAdd}>Add to Inventory</Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AddInventoryItemsContent;
