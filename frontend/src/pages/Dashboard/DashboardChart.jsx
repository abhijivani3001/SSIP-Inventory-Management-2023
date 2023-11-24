import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
  return formattedDate;
};

const DashboardChart = (props) => {
  const canvasRefs = useRef(props.users.map(() => React.createRef()));

  const fetchDataForItem = (item) => {
    // Fetch data for the selected item and update the chart
    // Example: You might make an API call to get data for the selected item
    // Update the chart accordingly using createComparisonChart function
    // For simplicity, you can log a message indicating the selected item for now
    console.log('Selected Item:', item);
  };

  const createComparisonChart = (index) => {
    const user = props.users[index];
    const comparisonData = {
      labels: Array.from(new Set(user.bulkOrders.flatMap((bulkOrder) => bulkOrder.orders.map((order) => order.name)))),
      requestedOrderQuantities: user.bulkOrders.flatMap((bulkOrder) =>
        bulkOrder.orders
          .filter((order) => ['pending', 'accepted', 'rejected'].includes(order.status)) // Filter orders with specific statuses
          .reduce((acc, order) => {
            const existingOrder = acc.find((requestedOrder) => requestedOrder.name === order.name);
            if (existingOrder) {
              existingOrder.quantity += order.quantity;
            } else {
              acc.push({ ...order });
            }
            return acc;
          }, [])
      ),
      planningOrderQuantities: user.planningBulkOrders
        ? user.planningBulkOrders.planningOrders.map((planningOrder) => planningOrder.quantity)
        : [],
      allocatedOrderQuantities: user.bulkOrders.flatMap((bulkOrder) =>
        bulkOrder.orders
          .filter((order) => order.status === 'completed') // Filter completed orders
          .reduce((acc, order) => {
            const existingOrder = acc.find((allocatedOrder) => allocatedOrder.name === order.name);
            if (existingOrder) {
              existingOrder.quantity += order.quantity;
            } else {
              acc.push({ ...order });
            }
            return acc;
          }, [])
      ),
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
            label: 'Requested Quantity',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: comparisonData.requestedOrderQuantities.map((order) => order.quantity),
          },
          {
            label: 'Planned Quantity',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: comparisonData.planningOrderQuantities,
          },
          {
            label: 'Allocated Quantity',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: comparisonData.allocatedOrderQuantities.map((order) => order.quantity),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value, context) => {
              return value; // Display quantity as the label
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    props.users.forEach((user, index) => {
      createComparisonChart(index);
    });
  }, [props.users]);

  return (
    <div>
      {props.users.map((user, index) => (
        <div key={index} className='mt-3'>
          <div className="mb-3">
            {/* Optional: Dropdown for item selection */}
            {/* <label htmlFor={`itemDropdown-${index}`} className="mr-2 text-lg">
              Select Item:
            </label>
            <select
              id={`itemDropdown-${index}`}
              onChange={(event) => fetchDataForItem(event.target.value)}
              className="p-2 border border-gray-400 rounded"
            >
              <option value="" disabled>
                Select an item
              </option>
              {user.bulkOrders.map((bulkOrder, orderIndex) => (
                <option key={orderIndex} value={bulkOrder.name}>
                  {bulkOrder.name}
                </option>
              ))}
            </select> */}
          </div>
          {/* Canvas for the comparison chart */}
          <canvas id={`comparison-chart-${index}`} width="800" height="500" ref={canvasRefs.current[index]}></canvas>
          <div className='p-5 m-5 text-2xl text-bold'>
            Order Table
          </div>
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
      ))}
    </div>
  );
};

export default DashboardChart;
