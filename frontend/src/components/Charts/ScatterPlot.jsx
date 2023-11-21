import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
import AuthContext from '../../store/auth-context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv';

const ScatterPlot = () => {
  const authCtx = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderName, setSelectedOrderName] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(
    localStorage.getItem('selectedFilter') || 'week'
  );

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

          // Sort chartData by date in ascending order
          chartData.sort((a, b) => {
            const dateA = new Date(
              parseInt(a.date.split('/')[2]),
              parseInt(a.date.split('/')[1]) - 1,
              parseInt(a.date.split('/')[0])
            );

            const dateB = new Date(
              parseInt(b.date.split('/')[2]),
              parseInt(b.date.split('/')[1]) - 1,
              parseInt(b.date.split('/')[0])
            );

            return dateA - dateB;
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

  const filterDataByRange = () => {
    const currentDate = new Date();
    let startDate = new Date();

    if (selectedFilter === 'week') {
      startDate.setDate(currentDate.getDate() - 7);
    } else if (selectedFilter === 'month') {
      startDate.setMonth(currentDate.getMonth() - 1);
    } else if (selectedFilter === 'year') {
      startDate.setFullYear(currentDate.getFullYear() - 1);
    }

    return orderData.filter((order) => {
      const orderDate = new Date(
        parseInt(order.date.split('/')[2]),
        parseInt(order.date.split('/')[1]) - 1,
        parseInt(order.date.split('/')[0])
      );

      return orderDate >= startDate && orderDate <= currentDate;
    });
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    localStorage.setItem('selectedFilter', value);
  };
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
              <div className='mx-10 my-5 border-gray-800 '>
                <h2 className='mx-5 my-5 text-2xl font-semibold'>
                  Order Quantity with date and name
                </h2>
                <div>
                  {/* <label>Select Order Name: </label>
                  <select
                    value={selectedOrderName}
                    onChange={(e) => setSelectedOrderName(e.target.value)}
                  >
                    <option value="">Select order name</option>
                    {Array.from(new Set(orderData.map((order) => order.name))).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select> */}

                  <label>Select Filter: </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="year">Last 365 days</option>
                  </select>
                </div>
                <LineChart
                  width={600}
                  height={400}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                  <CartesianGrid />
                  <XAxis dataKey='date' name='Date' />
                  <YAxis type='number' dataKey='quantity' name='Quantity' />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name, props) => [
                      value,
                      `Name: ${props.payload.name}`,
                      `Date: ${props.payload.date}`,
                    ]}
                  />
                  <Legend />
                  <Line
                    name='Orders'
                    data={filterDataByRange()}
                    dataKey='quantity'
                    stroke='#8884d8'
                    fill='#8884d8'
                  />
                </LineChart>
                <CSVLink
                  data={filterDataByRange()}
                  filename={'lineChartData.csv'}
                  className='border-gray-500 text-black p-2 hover:bg-blue-800 hover:text-white rounded-2xl bg-blue-400 hover:border-blue-700'
                >
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