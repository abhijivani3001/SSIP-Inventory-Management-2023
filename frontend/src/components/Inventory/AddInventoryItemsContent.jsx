import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import AddInventoryCard from './AddInventoryCard';
import Loader from '../ChakraUI/Loader';

const AddInventoryItemsContent = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post('api/item/getitems');
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

  // console.log('products', products);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-8 mb-8 w-full'>
          {!isProductsAvailable && (
            <div className='not_available'>Products is not available</div>
          )}

          {isProductsAvailable && (
            <>
              <div>
                <h1 className='text-4xl font-normal text-gray-800'>
                  Add Products to Inventory
                </h1>
              </div>
              <div className='flex flex-wrap justify-center my-3'>
                {products.map((val) => (
                  <AddInventoryCard
                    key={val._id}
                    title={val.name}
                    description={val.description}
                    company={val.company}
                    imageUrl={val.imageUrl}
                    category={val.category}
                    itemId={val._id}
                    getInventoryItems={props.getInventoryItems}
                  />
                ))}
              </div>
              <div className='flex gap-4 justify-center mb-8'>
                <button className='trans_btn mb-4' onClick={props.onClose}>
                  close
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddInventoryItemsContent;
