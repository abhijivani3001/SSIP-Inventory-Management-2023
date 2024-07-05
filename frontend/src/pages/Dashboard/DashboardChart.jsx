import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-GB',
    options
  );
  return formattedDate;
};

const DashboardChart = (props) => {
  const canvasRefs = useRef(props.users.map(() => React.createRef()));
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchDataForItem = (item, index) => {
    setSelectedItem(item);
    createComparisonChart(index);
  };
  const createComparisonChart = (index) => {
    const user = props.users[index];
    const comparisonData = {
      labels: Array.from(
        new Set(
          user.bulkOrders.flatMap((bulkOrder) =>
            bulkOrder.orders.map((order) => order.name)
          )
        )
      ),
      requestedOrderQuantities: user.bulkOrders.flatMap((bulkOrder) =>
        bulkOrder.orders
          .filter((order) =>
            ['pending', 'accepted', 'rejected', 'completed'].includes(
              order.status
            )
          )
          .reduce((acc, order) => {
            const existingOrder = acc.find(
              (requestedOrder) => requestedOrder.name === order.name
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
      allocatedOrderQuantities: user.bulkOrders.flatMap((bulkOrder) =>
        bulkOrder.orders
          .filter((order) => order.status === 'completed')
          .reduce((acc, order) => {
            const existingOrder = acc.find(
              (allocatedOrder) => allocatedOrder.name === order.name
            );
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
            label: 'Planned Quantity',
            backgroundColor: 'rgba(25, 139, 238, 0.95)',
            borderWidth: 1,
            data: comparisonData.planningOrderQuantities,
          },
          {
            label: 'Requested Quantity',
            backgroundColor: 'rgb(244 63 94)',
            borderWidth: 1,
            data: comparisonData.requestedOrderQuantities.map(
              (order) => order.quantity
            ),
          },
          {
            label: 'Allocated Quantity',
            backgroundColor: 'rgba(25, 229, 78, 0.95)',
            borderWidth: 1,
            data: comparisonData.allocatedOrderQuantities.map(
              (order) => order.quantity
            ),
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
              return value;
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                const labels = [];

                datasets.forEach((dataset, i) => {
                  labels.push({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                  });
                });

                return labels;
              },
            },
          },
        },
      },
    });
  };

  const applyDateFilter = (bulkOrder) => {
    if (!startDate || !endDate) {
      return true; // No date filter applied
    }

    const orderDate = new Date(bulkOrder.updatedAt);
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);

    return orderDate >= filterStartDate && orderDate <= filterEndDate;
  };

  const applyItemFilter = (order) => {
    return !selectedItem || order.name === selectedItem;
  };
  const filterOrders = (user) => {
    return user.bulkOrders.flatMap((bulkOrder) =>
      bulkOrder.orders
        .filter(
          (order) =>
            (!selectedItem || order.name === selectedItem) && // Add item filter
            applyDateFilter(bulkOrder) &&
            ['pending', 'accepted', 'rejected', 'completed'].includes(
              order.status
            )
        )
        .sort(
          (a, b) => new Date(formatDate(a.date)) - new Date(formatDate(b.date))
        )
        .map((order) => {
          const allocatedItem = user.planningBulkOrders?.planningOrders.find(
            (order2) => order2.itemId === order.itemId
          );
          return {
            ...order,
            date: bulkOrder.updatedAt,
            plannedQuantity: allocatedItem ? allocatedItem.quantity : 0,
            allocatedQuantity:
              order.status === 'completed' ? order.quantity : 0,
            requestedQuantity: order.quantity,
          };
        })
    );
  };

  const renderTableRows = (user) => {
    return filterOrders(user)
      .reduce(
        (acc, order) => {
          const row = [
            order.name,
            order.plannedQuantity || 0, // Add planned quantity
            order.requestedQuantity || 0, // Add requested quantity
            order.allocatedQuantity || 0, // Add allocated quantity
            formatDate(order.date),
          ].join(',');
          acc.push(row);
          return acc;
        },
        [
          'Order Name,Planned Quantity,Requested Quantity,Allocated Quantity,Date',
        ]
      )
      .join('\n');
  };

  const downloadCSV = (user) => {
    const csvContent = renderTableRows(user);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'Order_Details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    props.users.forEach((user, index) => {
      createComparisonChart(index);
    });
  }, [props.users, selectedItem, startDate, endDate]);
  return (
    <>
      {props.users.map((user, index) => (
        <div key={index} className='mt-3 w-full'>
          <div className='bg-indigo-500 py-2 flex flex-col shadow-xl rounded-xl relative text-center w-72 mx-auto hover:scale-105 transition duration-500'>
            <div className='font-bold text-2xl text-white'>Analysis</div>
            <div className='text-lg text-gray-100'>Overview</div>
          </div>

          <div className='bg-white p-8 rounded-lg border w-[60rem] h-[32rem] border-indigo-500 shadow-xl -mt-6 mx-auto'>
            <canvas
              id={`comparison-chart-${index}`}
              className='mx-auto px-4 w-full'
              ref={canvasRefs.current[index]}
            ></canvas>
          </div>

          <div className='my-10 border-t-2 p-10 mx-8'>
            <div className='mb-3 flex space-x-4'>
              {/* Add the item-wise select dropdown */}
              <label
                htmlFor={`itemSelect-${index}`}
                className='mr-2 mx-2 text-lg'
              >
                Select Item:
              </label>
              <select
                id={`itemSelect-${index}`}
                onChange={(event) => setSelectedItem(event.target.value)}
                className='p-2 border border-gray-400 rounded'
              >
                <option value=''>All Items</option>
                {user.bulkOrders
                  .flatMap((bulkOrder) =>
                    bulkOrder.orders.map((order) => order.name)
                  )
                  .map((itemName, itemIndex) => (
                    <option key={itemIndex} value={itemName}>
                      {itemName}
                    </option>
                  ))}
              </select>

              <label
                htmlFor={`fromDatePicker-${index}`}
                className='mr-2 mx-2 text-lg'
              >
                From Date:
              </label>
              <input
                type='date'
                id={`fromDatePicker-${index}`}
                onChange={(event) => setStartDate(event.target.value)}
                className='p-2 border border-gray-400 rounded'
              />
              <label htmlFor={`toDatePicker-${index}`} className='mr-2 text-lg'>
                To Date:
              </label>
              <input
                type='date'
                id={`toDatePicker-${index}`}
                onChange={(event) => setEndDate(event.target.value)}
                className='p-2 border border-gray-400 rounded'
              />
            </div>

            {/*  */}
            {user?.bulkOrders?.length > 0 ? (
              <>
                <table className='w-full border-collapse border border-slate-200 shadow-lg'>
                  <thead>
                    <tr className='bg-slate-100'>
                      <th className='border border-gray-400 p-1 text-xl'>
                        Order Name
                      </th>
                      <th className='border border-gray-400 p-1 text-xl'>
                        Planned Quantity
                      </th>
                      <th className='border border-gray-400 p-1 text-xl'>
                        Requested Quantity
                      </th>
                      <th className='border border-gray-400 p-1 text-xl'>
                        Allocated Quantity
                      </th>
                      <th className='border border-gray-400 p-1 text-xl'>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-base text-gray-700 bg-white'>
                    {filterOrders(user).map((mergedOrder, orderIndex) => (
                      <tr key={orderIndex}>
                        <td className='border border-gray-400 p-1 '>
                          {mergedOrder.name}
                        </td>
                        <td className='border border-gray-400 p-1 '>
                          {mergedOrder.plannedQuantity || 0}
                        </td>
                        <td className='border border-gray-400 p-1 '>
                          {mergedOrder.requestedQuantity || 0}
                        </td>
                        <td className='border border-gray-400 p-1 '>
                          {mergedOrder.allocatedQuantity || 0}
                        </td>
                        <td className='border border-gray-400 p-1 '>
                          {formatDate(mergedOrder.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => downloadCSV(user)}
                  className='bg-blue-500 text-white px-4 py-2 my-6 mx-auto justify-center rounded-md'
                >
                  Download CSV
                </button>
              </>
            ) : (
              <p className='text-xl text-gray-700 my-6 p-2 mx-20'>
                No orders placed by {user.name}.
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardChart;
