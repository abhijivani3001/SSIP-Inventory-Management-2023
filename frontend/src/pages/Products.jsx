import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Product from '../components/Products/Product';
import axios from '../api/AxiosUrl';
import SearchInput from 'react-search-input';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('api/item');
        const data = result.data.items;

        const finalData = data.map((item) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 30) + '...';
          }
          return item;
        });

        setProducts(finalData);

        if (finalData?.length) setIsProductsAvailable(true);
        else setIsProductsAvailable(false);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const searchHandler = (term) => {
    const lowerCaseQuery = term.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='mx-8 mt-4'>
      {isLoading && <div className='text-xl my-auto text-center'>Loading...</div>}
      {!isLoading && !isProductsAvailable && (
        <div className='not_available'>Products are not available</div>
      )}

      {!isLoading && isProductsAvailable && (
        <>
          <div>
            <h1 className='page-title'>Products</h1>
            <div className='flex justify-end mb-4'>
              <div className='relative'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute left-2 top-5 text-gray-500'
                  style={{ border: 'none', background: 'none', padding: 0 }}
                />
                <SearchInput
                  className='border border-gray-400 pl-8 pr-2 py-1 rounded-md'
                  placeholder='Search Product here'
                  onChange={searchHandler}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-center my-6'>
            <Product data={filteredProducts.length ? filteredProducts : products} />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
