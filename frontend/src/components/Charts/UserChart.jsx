import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import ReactApexChart from 'react-apexcharts';
import Loader from '../ChakraUI/Loader';

const UserOrdersChart = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`api/user`)
      .then((response) => {
        const usersFromAPI = response.data.users;
        console.log(usersFromAPI);
        const userOrderData = {};

        // Fetch order data for each user
        Promise.all(
          usersFromAPI.map((user) =>
            axios
              .get(`api/user/users/${user.id}/order`)
              .then((orderResponse) => {
                const orderDataFromAPI = orderResponse.data.orders;
                console.log(orderDataFromAPI);
                console.log(orderDataFromAPI);
                const totalQuantity = orderDataFromAPI.reduce(
                  (acc, order) => acc + order.quantity,
                  0
                );

                userOrderData[user.name] = totalQuantity;
              })
          )
        )
          .then(() => {
            // Transform the userOrderData object into an array of objects for the bar chart
            const chartData = Object.keys(userOrderData).map((userName) => ({
              x: userName,
              y: userOrderData[userName],
            }));

            setUserData(chartData);
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
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='p-4 bg-white rounded-lg shadow-lg'>
          {userData.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold mt-4'>
                Total Orders by User
              </h2>
              <ReactApexChart
                options={{
                  xaxis: {
                    categories: userData.map((data) => data.x),
                  },
                }}
                series={[{ data: userData.map((data) => data.y) }]}
                type='bar'
                width='500'
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserOrdersChart;
