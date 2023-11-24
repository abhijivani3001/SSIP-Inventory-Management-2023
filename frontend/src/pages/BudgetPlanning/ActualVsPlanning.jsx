import React, { useEffect, useState } from 'react';
import axios from '../../api/AxiosUrl';
import Loader from '../../components/ChakraUI/Loader';

const ActualVsPlanning = () => {
  const [actualOrders, setActualOrders] = useState(null);
  const [plannedOrders, setPlannedOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMergeOrder = (bulkOrders) => {
    const orderMap = new Map();
    bulkOrders.forEach((bulkOrder) => {
      bulkOrder.orders.forEach((order) => {
        if (order.status === 'completed') {
          if (orderMap.has(order.itemId)) {
            const mapItem = orderMap.get(order.itemId);
            let updatedOrder = {
              ...mapItem,
              quantity: order.quantity + mapItem.quantity,
            };
            orderMap.set(order.itemId, updatedOrder);
          } else {
            orderMap.set(order.itemId, order);
          }
        }
      });
    });

    let ordersArray = [];
    orderMap.forEach((order) => {
      ordersArray.push(order);
    });

    return ordersArray;
  };

  const getRequiredData = async () => {
    try {
      const res1 = await axios.get('api/user');
      const currentUser = res1.data.user;
      const mergedOrders = handleMergeOrder(currentUser.bulkOrders);
      setActualOrders(mergedOrders);
      setPlannedOrders(currentUser.planningBulkOrders.planningOrders);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRequiredData();
  });

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && <div></div>}
    </div>
  );
};

export default ActualVsPlanning;
