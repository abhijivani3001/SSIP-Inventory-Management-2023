import React, { useState, useEffect } from 'react';
import Loader from '../../components/ChakraUI/Loader';
import DashboardCard from './DashboardCard';
import axios from '../../api/AxiosUrl';
import { Allocated, Plan, Rejected, Request } from '../../icons/icons';
import DashboardChart from './DashboardChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        console.log(data);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleYearChange = (date) => {
    setSelectedYear(date.getFullYear());
    setFromDate(null);
    setToDate(null);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const filterOrdersByDate = (orders, startDate, endDate) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.updatedAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  let requestedOrders = [];
  let allocatedOrders = [];
  let rejectedOrders = [];
  let plannedOrders = [];

  if (userData?.bulkOrders) {
    const mergedOrders = {}; // req
    const mergedOrders2 = {}; // completed
    const mergedOrders3 = {}; // rejected

    userData.bulkOrders.forEach((bulkOrder) => {
      bulkOrder.orders.forEach((order) => {
        const orderDate = new Date(bulkOrder.updatedAt);

        if (orderDate >= fromDate && orderDate <= toDate) {
          if (order.status === 'completed') {
            const itemId = order.itemId;
            const existingOrder = mergedOrders2[itemId];

            if (existingOrder) {
              existingOrder.quantity += order.quantity;
            } else {
              mergedOrders2[itemId] = { ...order };
            }
          }
          if (order.status === 'rejected') {
            const itemId = order.itemId;
            const existingOrder = mergedOrders3[itemId];

            if (existingOrder) {
              existingOrder.quantity += order.quantity;
            } else {
              mergedOrders3[itemId] = { ...order };
            }
          }

          const itemId = order.itemId;
          const existingOrder = mergedOrders[itemId];

          if (existingOrder) {
            existingOrder.quantity += order.quantity;
          } else {
            mergedOrders[itemId] = { ...order };
          }
        }
      });
    });

    requestedOrders = Object.values(mergedOrders);
    allocatedOrders = Object.values(mergedOrders2);
    rejectedOrders = Object.values(mergedOrders3);
  }

  if (userData?.planningBulkOrders?.planningOrders) {
    plannedOrders = userData?.planningBulkOrders?.planningOrders;
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='my-8 mx-4'>
          <div className='flex justify-start mt-4'>
            <div className='flex flex-wrap justify-center rounded-t-lg'>
              <span className='mr-2'>Select Year:</span>
              <DatePicker
                selected={selectedYear}
                onChange={handleYearChange}
                dateFormat='yyyy'
                showYearPicker
                yearItemNumber={15}
                scrollableYearDropdown
              />
            </div>
            {selectedYear && (
              <>
                <div className='mr-4'>
                  <span className='mr-2'>From Date:</span>
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    minDate={new Date(selectedYear, 0, 1)}
                    maxDate={toDate || new Date(selectedYear, 11, 31)}
                  />
                </div>
                <div>
                  <span className='mr-2'>To Date:</span>
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDateChange}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    minDate={fromDate || new Date(selectedYear, 0, 1)}
                    maxDate={new Date(selectedYear, 11, 31)}
                  />
                </div>
              </>
            )}
          </div>
          <div className='relative border flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-24'>
            <div className='flex flex-wrap justify-center rounded-t-lg'>
              <div className='w-full p-4 flex justify-center'>
                <div className='-mt-20 flex justify-center gap-8'>
                  <DashboardCard
                    bg={'bg-teal-500'}
                    hover={'hover:bg-teal-600'}
                    orders={plannedOrders}
                    text={'Planned Orders'}
                    icon={<Plan />}
                  />
                  <DashboardCard
                    bg={'bg-yellow-300'}
                    hover={'hover:bg-yellow-400'}
                    orders={requestedOrders}
                    text={'Requested Orders'}
                    icon={<Request />}
                  />
                  <DashboardCard
                    bg={'bg-emerald-500'}
                    hover={'hover:bg-emerald-600'}
                    orders={allocatedOrders}
                    text={'Allocated Orders'}
                    icon={<Allocated />}
                  />
                  <DashboardCard
                    bg={'bg-red-500'}
                    hover={'hover:bg-red-600'}
                    orders={rejectedOrders}
                    text={'Rejected Orders'}
                    icon={<Rejected />}
                  />
                </div>
              </div>
            </div>
            <div className='border-t-2 text-center my-8 py-8 px-6'>
              <div className='flex flex-row justify-evenly align-middle'>
                <DashboardChart users={[userData]} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
