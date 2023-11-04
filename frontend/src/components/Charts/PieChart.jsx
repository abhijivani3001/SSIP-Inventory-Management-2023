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

  // Function to convert data to CSV
  const convertToCSV = () => {
    const csvRows = [];
    const headers = ['Username', 'Order Name', 'Order Date', 'Order Quantity'];
    csvRows.push(headers.join(','));

    // Extract data for the CSV from orderData
    for (const data of orderData) {
      csvRows.push([userData.name, data.x, userData.createdAt, data.y].join(','));
    }

    const csvData = csvRows.join('\n');
    return csvData;
  };

  // Function to trigger the CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_order_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg border-2 border-gray-800'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        orderData.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold mt-4'>Order Chart</h2>
            <ReactApexChart
              options={{
                labels: orderData.map((data) => data.x),
              }}
              series={orderData.map((data) => data.y)}
              type='pie'
              width='500'
              height='500'
            />

            {/* Add the Download button */}
            <button onClick={downloadCSV} className='bg-blue-500 text-white p-2 mt-4'>
              Download CSV
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default PieChart;
