import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/Inventory/InventoryCard';

import axios from '../api/AxiosUrl';
import Button from '../components/UI/Button';
import AddInventoryItem from '../components/Inventory/AddInventoryItem';

const Inventory = (props) => {
  const getInventoryItems = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      // console.log(data);

      const finalData = data.map((item) => {
        if (item.description.length > 40) {
          item.description = item.description.slice(0, 30) + '...';
        }
        return item;
      });
      setInventoryProducts(finalData);

      if (data.length) setIsInventoryProductsAvailable(true);
      else setIsInventoryProductsAvailable(false);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryProductsAvailable, setIsInventoryProductsAvailable] =
    useState(false);

  const [isAddProductsShown, setIsAddProductsShown] = useState(false);

  const showAddProductsHandler = () => {
    setIsAddProductsShown(true);
  };
  const hideAddProductsHandler = () => {
    setIsAddProductsShown(false);
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isInventoryProductsAvailable && (
        <div className='text-3xl text-center '>Products is not available</div>
      )}

      {!isLoading && isInventoryProductsAvailable && (
        <>
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
                inventoryId={val._id}
                setInventoryProducts={setInventoryProducts}
              />
            ))}
          </div>

          <div className=' text-center mb-6'>
            <Button onClick={showAddProductsHandler}>Add Item</Button>
          </div>

          {isAddProductsShown && (
            <AddInventoryItem
              onClose={hideAddProductsHandler}
              getInventoryItems={getInventoryItems}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Inventory;
