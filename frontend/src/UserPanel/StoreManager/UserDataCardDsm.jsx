import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-GB',
    options
  );
  return formattedDate;
};

const UserDataCardDsm = (props) => {
  const [showDetails, setShowDetails] = useState(props.users.map(() => false));
  const [showPlanningOrders, setShowPlanningOrders] = useState(
    props.users.map(() => false)
  );
  const [showComparisonCharts, setShowComparisonCharts] = useState(
    props.users.map(() => false)
  );

  const canvasRefs = useRef(props.users.map(() => React.createRef()));

  const handleViewDetails = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };

  const handleViewPlanningOrders = (index) => {
    setShowPlanningOrders((prevShowPlanningOrders) => {
      const newShowPlanningOrders = [...prevShowPlanningOrders];
      newShowPlanningOrders[index] = !newShowPlanningOrders[index];
      return newShowPlanningOrders;
    });
  };

  const handleCompare = (index) => {
    setShowComparisonCharts((prevShowComparisonCharts) => {
      const newShowComparisonCharts = [...prevShowComparisonCharts];
      newShowComparisonCharts[index] = !newShowComparisonCharts[index];
      return newShowComparisonCharts;
    });
    createComparisonChart(index);
  };

  const createComparisonChart = (index) => {
    if (showComparisonCharts[index]) {
      const user = props.users[index];
      const comparisonData = {
        labels: Array.from(
          new Set(
            user.bulkOrders.flatMap((bulkOrder) =>
              bulkOrder.orders.map((order) => order.name)
            )
          )
        ),
        mergedOrderQuantities: user.bulkOrders.flatMap((bulkOrder) =>
          bulkOrder.orders.reduce((acc, order) => {
            const existingOrder = acc.find(
              (mergedOrder) => mergedOrder.name === order.name
            );
            if (existingOrder) {
              existingOrder.quantity += order.quantity;
            } else {
              acc.push({ ...order });
            }
            return acc;
          }, [])
        ),
        planningOrderQuantities: user.planningBulkOrders
          ? user.planningBulkOrders.planningOrders.map(
              (planningOrder) => planningOrder.quantity
            )
          : [],
      };

      const ctx = canvasRefs.current[index].current;
      const existingChart = Chart.getChart(ctx);

      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: comparisonData.labels,
          datasets: [
            {
              label: 'Merged Order Quantity',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: comparisonData.mergedOrderQuantities.map(
                (order) => order.quantity
              ),
            },
            {
              label: 'Planning Order Quantity',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: comparisonData.planningOrderQuantities,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    props.users.forEach((user, index) => {
      createComparisonChart(index);
    });
  }, [showComparisonCharts]);

  return (
    <div>
      {props.users.map((user, index) => (
        <div key={index}>
          <div className='p-2 flex justify-between items-center'>
            <div>
              <div className='mx-0 p-1'>
                {user.name}{' '}
                <span className='text-gray-500 text-xl'>({user.role})</span>{' '}
              </div>
              <div className='text-xl ml-7'>
                Branch:{' '}
                <span className='text-gray-500 text-xl '>{user.branch}</span>
              </div>
              <div className='text-xl ml-7'>
                Email:{' '}
                <span className='text-gray-500 mr-14 text-xl'>
                  {user.email}
                </span>
                Phone:{' '}
                <span className='text-gray-500 text-xl'>{user.phone}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleViewDetails(index)}
                className='bg-blue-500 text-gray-900 text-xl px-1 py-1 rounded-xl m-3 p-1'
              >
                {showDetails[index] ? 'View Less' : 'View Details'}
              </button>
              <button
                onClick={() => handleViewPlanningOrders(index)}
                className='bg-green-500 text-gray-900 text-xl px-1 py-1 rounded-xl m-3 p-1'
              >
                {showPlanningOrders[index]
                  ? 'Hide Planning Orders'
                  : 'View Planning Orders'}
              </button>
              <button
                onClick={() => handleCompare(index)}
                className='bg-purple-500 text-gray-900 text-xl px-1 py-1 rounded-xl m-3 p-1'
              >
                {showComparisonCharts[index]
                  ? 'Hide Comparison Chart'
                  : 'Compare'}
              </button>
            </div>
          </div>
          {showDetails[index] && (
            <div className='mt-3'>
              {user.bulkOrders.length > 0 ? (
                <table className='w-full border-collapse border border-gray-400 mt-2'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='border border-gray-400 p-2 text-xl'>
                        Order Name
                      </th>
                      <th className='border border-gray-400 p-2 text-xl'>
                        Quantity
                      </th>
                      <th className='border border-gray-400 p-2 text-xl'>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.bulkOrders
                      .flatMap((bulkOrder) =>
                        bulkOrder.orders.map((order) => ({
                          ...order,
                          date: bulkOrder.updatedAt,
                        }))
                      )
                      .reduce((acc, order) => {
                        const existingOrderIndex = acc.findIndex(
                          (mergedOrder) =>
                            mergedOrder.name === order.name &&
                            formatDate(mergedOrder.date) ===
                              formatDate(order.date)
                        );
                        if (existingOrderIndex !== -1) {
                          acc[existingOrderIndex].quantity += order.quantity;
                        } else {
                          acc.push(order);
                        }
                        return acc;
                      }, [])
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((mergedOrder, orderIndex) => (
                        <tr key={orderIndex}>
                          <td className='border border-gray-400 p-2 text-xl'>
                            {mergedOrder.name}
                          </td>
                          <td className='border border-gray-400 p-2 text-xl'>
                            {mergedOrder.quantity}
                          </td>
                          <td className='border border-gray-400 p-2 text-xl'>
                            {formatDate(mergedOrder.date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className='text-xl text-black p-2 mx-20'>
                  No orders placed by {user.name}.
                </p>
              )}
            </div>
          )}
          {showPlanningOrders[index] && (
            <div className='mt-3'>
              {user.planningBulkOrders &&
              user.planningBulkOrders.planningOrders.length > 0 ? (
                <table className='w-full border-collapse border border-gray-400 mt-2'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='border border-gray-400 p-2 text-xl'>
                        Planning Order Name
                      </th>
                      <th className='border border-gray-400 p-2 text-xl'>
                        Quantity
                      </th>
                      {/* Add more columns as needed for planning orders */}
                    </tr>
                  </thead>
                  <tbody>
                    {user.planningBulkOrders.planningOrders.map(
                      (planningOrder, orderIndex) => (
                        <tr key={orderIndex}>
                          <td className='border border-gray-400 p-2 text-xl'>
                            {planningOrder.name}
                          </td>
                          <td className='border border-gray-400 p-2 text-xl'>
                            {planningOrder.quantity}
                          </td>
                          {/* Add more cells as needed for planning orders */}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <p className='text-xl text-black p-2 mx-20'>
                  No planning orders for {user.name}.
                </p>
              )}
            </div>
          )}
          {showComparisonCharts[index] && (
            <div className='mt-3'>
              <canvas
                id={`comparison-chart-${index}`}
                width='200'
                height='50'
                ref={canvasRefs.current[index]}
              ></canvas>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDataCardDsm;
