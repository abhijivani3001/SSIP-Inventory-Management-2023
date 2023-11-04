import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import ReactApexChart from 'react-apexcharts';

const OrderData = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`api/order`)
      .then((orderResponse) => {
        const orderDataFromAPI = orderResponse.data.orders;
        console.log(orderDataFromAPI);

        // Create a map to calculate the count of orders for each date
        const dateOrderMap = new Map();

        // Iterate through the order data to calculate the count of orders for each date
        orderDataFromAPI.forEach((order) => {
          const createdAt = order.createdAt; // Get the date

          if (dateOrderMap.has(createdAt)) {
            // Increment the order count
            dateOrderMap.set(createdAt, dateOrderMap.get(createdAt) + 1);
          } else {
            // Initialize a new count
            dateOrderMap.set(createdAt, 1);
          }
        });

        // Transform the map into an array of objects for the pie chart
        const chartData = Array.from(dateOrderMap).map(
          ([date, orderCount]) => ({
            x: date, // Label for the slice
            y: orderCount, // Value for the slice
          })
        );

        setOrderData(chartData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        orderData.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold mt-4'>Order Data Chart</h2>
            <ReactApexChart
              options={{
                labels: orderData.map((data) => data.x),
              }}
              series={orderData.map((data) => data.y)}
              type='pie'
              width='500'
              height='500'
            />
          </div>
        )
      )}
    </div>
  );
};

export default OrderData;
