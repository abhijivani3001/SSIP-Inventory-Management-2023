import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/AxiosUrl';
import { Box, Heading, Spinner, Flex, Center, Text } from '@chakra-ui/react';
import AuthContext from '../store/auth-context';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import ScatterPlot from '../components/Charts/ScatterPlot';
import Loader from '../components/ChakraUI/Loader';

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

              if (order.status === 'completed') {
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
    // <Box p={4} bg="gray.100" rounded="lg" shadow="lg">
    //   {isLoading ? (
    //     <Center>
    //       <Spinner size="xl" />
    //     </Center>
    //   ) : (
    //     <>
    //       <Heading as="h1" fontSize="2xl" fontWeight="semibold" mb={4}>
    //         Dashboard
    //       </Heading>
    //       <Flex wrap="wrap" justify="center">
    //         {orderData.orderChartData?.length < 1 ||
    //           orderData.barChartData?.length < 1 ? (
    //           <Text fontSize="lg" color="gray.600">
    //             No order placed by you
    //           </Text>
    //         ) : (
    //           <>
    //             <Box mx={10} my={5} border="1px" rounded="2xl">
    //               <Heading mx={5} my={5} fontSize="2xl" fontWeight="semibold">
    //                 Total Ordered Quantity with Names
    //               </Heading>
    //               <PieChart orderData={orderData?.orderChartData} />
    //             </Box>
    //             <Box mx={10} my={5} border="1px" rounded="2xl">
    //               <Heading mx={5} my={5} fontSize="2xl" fontWeight="semibold">
    //                 Total Orders
    //               </Heading>
    //               <BarChart orderData={orderData?.barChartData} />
    //             </Box>
    //             {/* <Box mx={10} my={5} border="1px" rounded="2xl">
    //               <StackedColumnChart />
    //             </Box> */}
    //             <Box mx={10} my={5} border="1px" rounded="2xl">
    //               <ScatterPlot />
    //             </Box>
    //           </>
    //         )}
    //       </Flex>
    //     </>
    //   )}
    // </Box>

    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {/* <div className='flex flex-wrap justify-center gap-6 align-middle'> */}

          {/* </div> */}
        </>
      )}
    </>
  );
};

export default Dashboard;
