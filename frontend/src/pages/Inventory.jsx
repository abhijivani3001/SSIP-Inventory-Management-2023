import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/Inventory/InventoryCard';
import axios from '../api/AxiosUrl';
import AddInventoryItem from '../components/Inventory/AddInventoryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Loader from '../components/ChakraUI/Loader';

const Inventory = (props) => {
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryProductsAvailable, setIsInventoryProductsAvailable] =
    useState(false);
  const [isAddProductsShown, setIsAddProductsShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getInventoryItems = async () => {
    try {
      const result = await axios.get('api/inventory');
      const data = await result.data.inventory;
      console.log(data);
      
      let flag = false;
      const finalData = data.map((item) => {
        if (item.quantity < 10) {
          flag = true;
        }
        if (item.description.length > 40) {
          item.description = item.description.slice(0, 30) + '...';
        }
        return item;
      });
      if (flag === true) {
        toast.error('Some items are below minimum required quantity!', {
          autoClose: 1000,
        });
      }
      setInventoryProducts(finalData);

      if (data?.length) setIsInventoryProductsAvailable(true);
      else setIsInventoryProductsAvailable(false);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const showAddProductsHandler = () => {
    setIsAddProductsShown(true);
  };

  const hideAddProductsHandler = () => {
    setIsAddProductsShown(false);
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 my-4'>
          {!isInventoryProductsAvailable && (
            <div className='not_available'>Your Inventory is empty</div>
          )}

          <>
            {isInventoryProductsAvailable && (
              <>
                <div className='flex justify-end items-center my-4'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Search Product here'
                      value={searchQuery}
                      onChange={handleSearch}
                      className='border border-gray-400 pl-8 pr-2 py-1 rounded-md'
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className='absolute left-2 top-2.5 text-gray-500'
                    />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center my-6'>
                  {filteredInventory.map((val) => (
                    <InventoryCard
                      key={val._id}
                      name={val.name}
                      description={val.description}
                      company={val.company}
                      category={val.category}
                      imageUrl={val.imageUrl}
                      quantity={val.quantity}
                      inventoryId={val._id}
                      getInventoryItems={getInventoryItems}
                      minValue={val.minValue}
                      maxValue={val.maxValue}
                    />
                  ))}
                </div>
              </>
            )}

            <div className='text-center my-6'>
              <button className='blue_btn' onClick={showAddProductsHandler}>
                Add Item
              </button>
            </div>

            {isAddProductsShown && (
              <AddInventoryItem
                onClose={hideAddProductsHandler}
                getInventoryItems={getInventoryItems}
              />
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Inventory;
