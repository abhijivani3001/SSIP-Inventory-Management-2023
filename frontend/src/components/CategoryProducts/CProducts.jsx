import { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import CProductCard from './CProductCard';

const CProducts = () => {
  const [categoryMap, setCategoryMap] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getRequiredData = async () => {
    try {
      const result = await axios.post('api/item/getitems');
      const items = result.data.items;
      const categoryMap2 = new Map();
      items.forEach((item) => {
        if (categoryMap2.has(item.category)) {
          const mapItem = categoryMap2.get(item.category);
          mapItem.push(item);
        } else categoryMap2.set(item.category, [item]);
      });
      setCategoryMap(categoryMap2);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 m-7">
      {isLoading && (
        <div className="text-xl my-auto text-center">Loading...</div>
      )}
      {!isLoading &&
        categoryMap.forEach((items) => {
          return <CProductCard items={items} />;
        })}
    </div>
  );
};

export default CProducts;
