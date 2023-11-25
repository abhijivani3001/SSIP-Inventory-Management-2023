import React, { useState } from 'react';
import axios from '../api/AxiosUrl';

const LowStock = () => {
  const [userData, setUserData] = useState();
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryProductsAvailable, setIsInventoryProductsAvailable] =
    useState(false);
  const [isAddProductsShown, setIsAddProductsShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);



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

              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default LowStock;
