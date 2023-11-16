import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
// import AuthContext from '../store/auth-context';
import AuthContext from '../../store/auth-context';
import ReactApexChart from 'react-apexcharts';
import { CSVLink } from 'react-csv';

const StackedColumnChart = () => {
  const authCtx = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      axios
        .get('api/order')
        .then((orderResponse) => {
          const bulkOrders = orderResponse.data.bulkOrders;
          const mergedData = {};

          bulkOrders.forEach((item) => {
            item.orders.forEach((order) => {
              const name = order.name;
              const quantity = order.quantity;
              const date = formatDate(item.createdAt);

              // Create a unique key for each order name
              const key = name;

              // Add quantity to the existing data or create a new entry
              if (mergedData[key]) {
                // Check if the date already exists for this order name
                const existingDate = mergedData[key].find((entry) => entry.date === date);

                if (existingDate) {
                  existingDate.quantity += quantity;
                } else {
                  mergedData[key].push({ date, quantity });
                }
              } else {
                mergedData[key] = [{ date, quantity }];
              }
            });
          });

          // Convert the mergedData object into an array
          const chartData = Object.entries(mergedData).map(([name, entries]) => {
            // Sum up the quantities for the same date
            const aggregatedEntries = entries.reduce(
              (acc, entry) => {
                const existingDate = acc.find((item) => item.date === entry.date);
                if (existingDate) {
                  existingDate.quantity += entry.quantity;
                } else {
                  acc.push({ date: entry.date, quantity: entry.quantity });
                }
                return acc;
              },
              []
            );

            return { name, entries: aggregatedEntries };
          });

          setOrderData(chartData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order data:', error);
          setIsLoading(false);
        });
    }
  }, [authCtx.isLoggedIn]);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: 'category',
      categories: orderData.length > 0
        ? orderData[0].entries
          .map((entry) => entry.date)
          .sort((a, b) => {
            const dateA = new Date(a.split('/').reverse().join('/'));
            const dateB = new Date(b.split('/').reverse().join('/'));
            return dateA - dateB;
          })
        : [],
    },
    legend: {
      position: 'top',
    },
  };

  const series = orderData.map(({ name, entries }) => ({
    name,
    data: entries.map((entry) => entry.quantity),
  }));

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-lg'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {orderData.length < 1 ? (
              <span className='not_available'>No order placed by you</span>
            ) : (
              <div className='mx-10 my-5 border-gray-800  rounded-2xl'>
                <h2 className='mx-5 my-5 text-2xl font-semibold'>
                  Date-wise order with Quantity
                </h2>
                <ReactApexChart
                  options={options}
                  series={series}
                  type='bar'
                  height={400}
                  width={400}
                />
                {/* <CSVLink data={orderData} filename={'stackedColumnChartData.csv'}>
                  Download CSV
                </CSVLink> */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StackedColumnChart;