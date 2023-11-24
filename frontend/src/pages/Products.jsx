import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Product from '../components/Products/Product';
import axios from '../api/AxiosUrl';
import { Select } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import SearchInput from 'react-search-input';
import Loader from '../components/ChakraUI/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsAvailable, setIsProductsAvailable] = useState(false);
  const [isNoMatch, setIsNoMatch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('api/item/getitems');
        const data = result.data.items;

        const finalData = data.map((item) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 30) + '...';
          }
          return item;
        });

        setProducts(finalData);
        setFilteredProducts(finalData);

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

    if (filtered.length > 0) {
      setIsNoMatch(false);
    } else {
      setIsNoMatch(true);
    }

    setFilteredProducts(filtered);
  };

  const categoryHandler = (category) => {
    if (!category || category === 'all') {
      setFilteredProducts(products);
      return;
    }
    const lowerCaseQuery = category.toLowerCase();
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === lowerCaseQuery
    );

    if (filtered.length > 0) {
      setIsNoMatch(false);
    } else {
      setIsNoMatch(true);
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-10 my-4'>
          {!isProductsAvailable && (
            <div className='not_available'>Products are not available</div>
          )}

          {isProductsAvailable && (
            <div>
              <div className='flex items-center justify-between mb-4 border-b p-4'>
                <div className='flex items-center bg-white'>
                  <Select
                    placeholder='Select Category'
                    className='cursor-pointer border border-gray-200 rounded-lg'
                    onChange={(e) => categoryHandler(e.target.value)}
                  >
                    <option value='all'>All</option>
                    <option value='Stationary'>Stationary</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Furniture'>Furniture</option>
                    <option value='Telecommunication'>
                      TeleCommunications
                    </option>
                  </Select>
                </div>
                <div className='flex items-center border rounded-lg px-3 bg-white shadow-md'>
                  <FaSearch className='text-xl text-gray-700' />
                  <SearchInput
                    className='outline-none border-none px-4 rounded-md'
                    placeholder='Search Product here'
                    onChange={searchHandler}
                  />
                </div>
              </div>

              <div className='flex flex-wrap justify-center my-6'>
                {filteredProducts.length > 0 ? (
                  <Product data={filteredProducts} />
                ) : (
                  isNoMatch && <div>No items matched your search.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
