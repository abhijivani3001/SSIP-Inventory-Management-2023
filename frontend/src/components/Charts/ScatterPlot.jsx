import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
import AuthContext from '../../store/auth-context';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv';

const ScatterPlot = () => {
  const authCtx = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      axios
        .get('api/order')
        .then((orderResponse) => {
          const bulkOrders = orderResponse.data.bulkOrders;
          const chartData = [];

          bulkOrders.forEach((item) => {
            item.orders.forEach((order) => {
              const name = order.name;
              const quantity = order.quantity;
              const date = formatDate(item.createdAt);

              chartData.push({ date, name, quantity });
            });
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

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-lg'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
          <div>
            {orderData.length < 1 ? (
              <span className='not_available'>No order placed by you</span>
            ) : (
              <div className='mx-10 my-5 border-gray-800 border rounded-2xl'>
                <h2 className='mx-5 my-5 text-2xl font-semibold'>
                  Date, Order Name, and Order Quantity
                </h2>
                <ScatterChart
                  width={600}
                  height={400}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                  <CartesianGrid />
                  <XAxis type='category' dataKey='date' name='Date' />
                  <YAxis type='number' dataKey='quantity' name='Quantity' />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name='Orders' data={orderData} fill='#8884d8' />
                </ScatterChart>
                <CSVLink data={orderData} filename={'scatterChartData.csv'}>
                  Download CSV
                </CSVLink>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScatterPlot;