import React, { useEffect, useState } from 'react';
import axios from '../../../api/AxiosUrl';
import AddPlannedProductThree from './AddPlannedProductThree';
import Loader from '../../../components/ChakraUI/Loader';

const AddPlannedProductTwo = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post('api/item/getitems');
        const data = await result.data.items;

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
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-8 mb-8'>
          {!isProductsAvailable && (
            <div className='not_available'>Products is not available</div>
          )}

          {isProductsAvailable && (
            <>
              <div>
                <h1 className='text-4xl font-light'>
                  Add Products to your Plan
                </h1>
              </div>
              <div className='flex flex-wrap justify-center my-3'>
                {products.map((val) => (
                  <AddPlannedProductThree
                    key={val._id}
                    title={val.name}
                    description={val.description}
                    company={val.company}
                    imageUrl={val.imageUrl}
                    category={val.category}
                    itemId={val._id}
                    getPlannedOrders={props.getPlannedOrders}
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

export default AddPlannedProductTwo;
