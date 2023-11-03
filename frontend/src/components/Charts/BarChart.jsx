import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/AxiosUrl';
import ReactApexChart from 'react-apexcharts';
import AuthContext from '../../store/auth-context';

const BarChart = () => {
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
          setIsLoading(false);

          axios
            .get(`api/order`)
            .then((orderResponse) => {
              const orderDataFromAPI = orderResponse.data.orders;
              console.log(orderDataFromAPI);

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
              const chartData = Array.from(dateOrderMap).map(
                ([date, totalQuantity]) => ({
                  x: date, // Label for the bar
                  y: totalQuantity, // Value for the bar
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
            <h2 className='text-xl font-semibold mt-4'>Daily Order Chart</h2>
            <ReactApexChart
              options={{
                xaxis: {
                  categories: orderData.map((data) => data.x), // Extract the date labels
                },
              }}
              series={[{ data: orderData.map((data) => data.y) }]} // Extract the total quantities
              type='bar'
              width='500'
            />
          </div>
        )
      )}
    </div>
  );
};

export default BarChart;
