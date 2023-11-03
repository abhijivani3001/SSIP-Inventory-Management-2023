import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
import ReactApexChart from 'react-apexcharts';
import AuthContext from '../../store/auth-context';

const PieChart = () => {
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

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      axios
        .get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          setUserData(userDataFromAPI);
          setIsLoading(false);

          axios
            .get(`api/order`)
            .then((orderResponse) => {
              const orderDataFromAPI = orderResponse.data.orders;
              console.log(orderDataFromAPI);

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
              const chartData = Array.from(categoryMap).map(
                ([category, quantity]) => ({
                  x: category, // Label for the slice
                  y: quantity, // Value for the slice
                })
              );

              setOrderData(chartData);
            })
            .catch((error) => {
              console.error('Error fetching order data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    }
  }, [authCtx.isLoggedIn, authCtx.email]);

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        orderData.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold mt-4'>Order Chart</h2>
            <ReactApexChart
              options={{
                labels: orderData.map((data) => data.x), // Extract the labels from chartData
              }}
              series={orderData.map((data) => data.y)} // Extract the values from chartData
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
export default PieChart;
