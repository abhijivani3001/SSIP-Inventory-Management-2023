import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/AxiosUrl';
import AuthContext from '../store/auth-context';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import StackedColumnChart from '../components/Charts/StackedColumnChart';
import ScatterPlot from '../components/Charts/ScatterPlot';

const Dashboard = () => {
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
          const orderMap = new Map();
          const dateOrderMap = new Map();

          bulkOrders.forEach((item) => {
            item.orders.forEach((order) => {
              const name = order.name;
              const quantity = order.quantity;
              console.log(name, quantity);
              const date = formatDate(item.createdAt);

              if (orderMap.has(name)) {
                orderMap.set(name, orderMap.get(name) + quantity);
              } else {
                orderMap.set(name, quantity);
              }

              if (dateOrderMap.has(date)) {
                dateOrderMap.set(date, dateOrderMap.get(date) + quantity);
              } else {
                dateOrderMap.set(date, quantity);
              }
            });
          });

          const orderChartData = Array.from(orderMap)?.map(
            ([name, quantity]) => ({ name, quantity })
          );
          const barChartData = Array.from(dateOrderMap)?.map(
            ([date, totalQuantity]) => ({ x: date, y: totalQuantity })
          );

          const sortedBarChartData = barChartData.sort((a, b) => {
            const dateA = new Date(a.x.split('/').reverse().join('/'));
            const dateB = new Date(b.x.split('/').reverse().join('/'));
            return dateA - dateB;
          });

          console.log(orderChartData);

          setOrderData({ orderChartData, barChartData });
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
            {orderData.orderChartData?.length < 1 ||
              orderData.barChartData?.length < 1 ? (
              <span className='not_available'>No order placed by you</span>
            ) : (
              <div className='flex flex-wrap justify-center'>
                {/* <div className='mx-10 my-5'>
                  <PieChart orderData={orderData.orderChartData} />
                </div> */}
                <div className='mx-10 my-5 border-gray-800 border rounded-2xl'>
                  <h2 className='mx-5 my-5 text-2xl font-semibold'>
                    Total Ordered Quantity with Names{' '}
                  </h2>
                  <PieChart orderData={orderData?.orderChartData} />
                </div>
                <div className='mx-10 my-5 border-gray-800 border rounded-2xl'>
                  <h2 className='mx-5 my-5 text-2xl font-semibold'>
                    Total Orders
                  </h2>
                  <BarChart orderData={orderData?.barChartData} />
                </div>
                <div></div>
                <StackedColumnChart />
                <ScatterPlot />
              </div>

            )}
          </div>
        </>
      )
      }
    </div >
  );
};

export default Dashboard;
