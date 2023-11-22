import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';

const ItemRequests = () => {
  const [pendingItems, setPendingItems] = useState([]);

  const updateItem = async (itemId, status) => {
    // itemId is item._id
    const res = await axios.post(`/api/item/${itemId}`, { status });
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.post('/api/item/getitems', { status: 'pending' });
      setPendingItems(res.data.items);
    })();
  }, []);

  return (
    <div>
      <h2>Requested Items</h2>
      {pendingItems &&
        pendingItems.map((item) => {
          return <div>{item.name}</div>;
        })}
    </div>
  );
};

export default ItemRequests;
