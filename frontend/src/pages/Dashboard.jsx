import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/AxiosUrl';
import AuthContext from '../store/auth-context';
import ReactApexChart from 'react-apexcharts';

import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import UserChart from '../components/Charts/UserChart';
import OrderData from '../components/Charts/OrderData';
// import OrderGraph from '../components/Charts/OrderGraph';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    subBranch: '',
    branch: '',
    department: '',
  });
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
        .get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          setUserData(userDataFromAPI);

          axios
            .get(`api/order`)
            .then((orderResponse) => {
              const orderDataFromAPI = orderResponse.data.orders;
              // console.log(orderDataFromAPI);

              // Create a map to calculate the sum of quantities for each category
              const categoryMap = new Map();

              // Iterate through the order data to calculate the sum of quantities for each category
              orderDataFromAPI.forEach((order) => {
                const category = order.name;
                const quantity = order.quantity;

                if (categoryMap.has(category)) {
                  // Add to the existing sum
                  categoryMap.set(
                    category,
                    categoryMap.get(category) + quantity
                  );
                } else {
                  // Initialize a new sum
                  categoryMap.set(category, quantity);
                }
              });

              // Transform the map into an array of objects for the pie chart
              const pieChartData = Array.from(categoryMap).map(
                ([category, quantity]) => ({
                  x: category, // Label for the slice
                  y: quantity, // Value for the slice
                })
              );

              setOrderData(pieChartData);

              // Create a map to calculate the total order quantity date-wise
              const dateOrderMap = new Map();

              // Iterate through the order data to calculate the total order quantity for each date
              orderDataFromAPI.forEach((order) => {
                const createdAt = formatDate(order.createdAt); // Format the date as dd/mm/yyyy

                if (dateOrderMap.has(createdAt)) {
                  // Add to the existing total
                  dateOrderMap.set(
                    createdAt,
                    dateOrderMap.get(createdAt) + order.quantity
                  );
                } else {
                  // Initialize a new total
                  dateOrderMap.set(createdAt, order.quantity);
                }
              });

              // Transform the map into an array of objects for the bar chart
              const barChartData = Array.from(dateOrderMap).map(
                ([date, totalQuantity]) => ({
                  x: date, // Label for the bar
                  y: totalQuantity, // Value for the bar
                })
              );
              // console.log

              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching order data:', error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    }
  }, [authCtx.isLoggedIn, authCtx.email]);
  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-lg'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
          <div>
            {orderData.length < 1 ? (
              <span className='text-2xl mx-3'>No order placed by you</span>
            ) : (
              <div className='flex flex-wrap justify-center'>
                <div className='mx-10 my-5 broder '>
                  <PieChart />
                </div>
                <div className='mx-10 my-5'>
                  <BarChart />
                </div>
                <div className='mx-10 my-5'>{/* <UserChart /> */}</div>
                <div className='mx-10 my-5'>
                  <OrderData />
                </div>
                <div className='mx-10 my-5'>{/* <OrderGraph /> */}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
