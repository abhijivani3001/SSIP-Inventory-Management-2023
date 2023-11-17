import React, { useEffect, useState } from 'react';
import Product from '../components/Products/Product';
import axios from '../api/AxiosUrl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
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
              <input
                type='text'
                placeholder='Search by name'
                value={searchQuery}
                onChange={handleInputChange}
                className='border border-gray-400 px-2 py-1 rounded-md'
              />
              <button
                onClick={handleSearch}
                className='bg-blue-500 text-white px-4 py-1 ml-2 rounded-md'
              >
                Search
              </button>
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
