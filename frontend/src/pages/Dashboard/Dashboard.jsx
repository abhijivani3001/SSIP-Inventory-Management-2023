import React, { useState, useEffect } from 'react';
import Loader from '../../components/ChakraUI/Loader';
import DashboardCard from './DashboardCard';
import axios from '../../api/AxiosUrl';
import { Allocated, Plan, Rejected, Request } from '../../icons/icons';
import DashboardChart from './DashboardChart';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  // const [plannedOrders, setPlannedOrders] = useState([]);
  // const [requestedOrders, setRequestedOrders] = useState([]);
  // const [allocatedOrders, setAllocatedOrders] = useState([]);
  // const [rejectedOrders, setRejectedOrders] = useState([]);

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

  const mergedOrders = {}; // req
  const mergedOrders2 = {}; // completed
  const mergedOrders3 = {}; // rejected
  userData?.bulkOrders?.forEach((bulkOrder) => {
    bulkOrder.orders.forEach((order) => {
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

  // Convert the mergedOrders object back to an array
  const requestedOrders = Object.values(mergedOrders);
  const allocatedOrders = Object.values(mergedOrders2);
  const rejectedOrders = Object.values(mergedOrders3);
  const plannedOrders = userData?.planningBulkOrders?.planningOrders;

  console.log(allocatedOrders);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='my-8 mx-4'>
          <div className='relative border flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-24'>
            <div className='flex flex-wrap justify-center bg-slate-100 rounded-t-lg'>
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
            <div className='text-center my-8 px-6'>
              <h3 className='text-3xl font-semibold leading-normal mb-8 text-slate-700'>
                chart
              </h3>
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
