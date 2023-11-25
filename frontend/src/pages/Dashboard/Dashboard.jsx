import React, { useState, useEffect } from 'react';
import Loader from '../../components/ChakraUI/Loader';
import DashboardCard from './DashboardCard';
import axios from '../../api/AxiosUrl';
import {
  Allocated,
  Employees,
  Inventory,
  Low,
  Pending,
  Plan,
  Rejected,
  Request,
} from '../../icons/icons';
import DashboardChart from './DashboardChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ROLES from '../../constants/ROLES';

import { findBelowUsers } from '../../Helper/Helper';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  // store-manager
  const [belowUsers, setBelowUsers] = useState([]);
  // const [lowStock, setLowStock] = useState(0);
  const [lowStock, setLowStock] = useState([]);
  // let lowStock=[];

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const data = await res.data.user;
        setUserData(data);

        const res2 = await axios.post('/api/user/users', findBelowUsers(data));
        const data2 = await res2.data.users;

        if (data2?.length) {
          setBelowUsers(data2);
        }
        console.log(data2);

        // pending
        data2?.forEach((user) => {
          user.bulkOrders.forEach((bulkOrder) => {
            bulkOrder.orders.forEach((order) => {
              if (order.status === 'pending') {
                setPendingOrders((prev) => prev + 1);
              }
            });
          });
        });

        // low stock
        const temp3 = [];
        const res3 = await axios.get('api/inventory');
        const data3 = await res3?.data.inventory;
        // console.log(data3);
        data3.forEach((inventoryItem) => {
          if (
            inventoryItem.quantity <
            (20 * inventoryItem.minValue) / 100 + inventoryItem.minValue
          ) {
            temp3.push(inventoryItem);
          }
        });
        setLowStock(temp3)
        // console.log(lowStock);


        

      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  // -----
  let requestedOrders = [];
  let allocatedOrders = [];
  let rejectedOrders = [];
  let plannedOrders = [];
  // let pendingOrders = [];
  const [pendingOrders, setPendingOrders] = useState(0);

  if (userData?.bulkOrders) {
    const mergedOrders = {}; // req
    const mergedOrders2 = {}; // completed
    const mergedOrders3 = {}; // rejected

    const mergedOrders4 = []; // pending

    userData?.bulkOrders?.forEach((bulkOrder) => {
      bulkOrder.orders.forEach((order) => {
        const orderDate = new Date(bulkOrder.updatedAt);

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
      });
    });

    requestedOrders = Object.values(mergedOrders);
    allocatedOrders = Object.values(mergedOrders2);
    rejectedOrders = Object.values(mergedOrders3);
    // pendingOrders=Object.values(mergedOrders4);
    // pendingOrders=count;
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
            <div className='flex flex-wrap justify-center rounded-t-lg'></div>
            <>
              <div className='mr-4'>
                {/* <span className='mr-2'>From Date:</span>
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    minDate={new Date(selectedYear, 0, 1)}
                    maxDate={toDate || new Date(selectedYear, 11, 31)}
                  /> */}
              </div>
              <div>
                {/* <span className='mr-2'>To Date:</span>
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDateChange}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    minDate={fromDate || new Date(selectedYear, 0, 1)}
                    maxDate={new Date(selectedYear, 11, 31)}
                  /> */}
              </div>
            </>
          </div>
          <div className='relative border flex flex-col min-w-0 break-words bg-slate-50 w-full mb-6 shadow-lg rounded-lg mt-24'>
            <div className='flex flex-wrap justify-center rounded-t-lg'>
              {/* common */}
              <div className='w-full p-4 flex flex-wrap justify-center'>
                <div className='-mt-20 flex justify-center gap-8'>
                  <DashboardCard
                    bg={'bg-teal-500'}
                    hover={'hover:bg-teal-600'}
                    orders={plannedOrders}
                    text={'Planned Orders'}
                    icon={<Plan />}
                    role={'common'}
                  />
                  <DashboardCard
                    bg={'bg-yellow-300'}
                    hover={'hover:bg-yellow-400'}
                    orders={requestedOrders}
                    text={'Requested Orders'}
                    icon={<Request />}
                    role={'common'}
                  />
                  <DashboardCard
                    bg={'bg-emerald-500'}
                    hover={'hover:bg-emerald-600'}
                    orders={allocatedOrders}
                    text={'Allocated Orders'}
                    icon={<Allocated />}
                    role={'common'}
                  />
                  <DashboardCard
                    bg={'bg-red-500'}
                    hover={'hover:bg-red-600'}
                    orders={rejectedOrders}
                    text={'Rejected Orders'}
                    icon={<Rejected />}
                    role={'common'}
                  />
                </div>
              </div>

              {/* store-manager */}
              {(userData.role === ROLES.SUB_BRANCH_STORE_MANAGER ||
                userData.role === ROLES.BRANCH_STORE_MANAGER ||
                userData.role === ROLES.DEPARTMENT_STORE_MANAGER) && (
                <div className='w-full p-4 flex flex-wrap justify-center'>
                  <div className='-mt- flex justify-center gap-8'>
                    <DashboardCard
                      bg={'bg-orange-400'}
                      hover={'hover:bg-orange-500'}
                      belowUsers={belowUsers}
                      icon={<Employees />}
                      role={'store-manager'}
                      tag={'1'}
                      text={'Employees'}
                    />
                    <DashboardCard
                      bg={'bg-violet-500'}
                      hover={'hover:bg-violet-600'}
                      inventory={userData?.inventory}
                      text={'Inventory Items'}
                      icon={<Inventory />}
                      role={'store-manager'}
                      tag={'2'}
                    />
                    <DashboardCard
                      bg={'bg-pink-500'}
                      hover={'hover:bg-pink-600'}
                      lowStock={lowStock}
                      text={'Items Low on Stock'}
                      icon={<Low />}
                      role={'store-manager'}
                      tag={'3'}
                    />
                    <DashboardCard
                      bg={'bg-lime-500'}
                      hover={'hover:bg-lime-600'}
                      pendingOrders={pendingOrders}
                      text={'Pending Requests'}
                      icon={<Pending />}
                      role={'store-manager'}
                      tag={'4'}
                    />
                  </div>
                </div>
              )}

              {/* --- */}
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
