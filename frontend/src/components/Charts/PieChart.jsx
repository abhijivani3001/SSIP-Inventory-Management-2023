import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CSVLink } from 'react-csv';

const PieChart = ({ orderData }) => {
  console.log(orderData);
  const labels = orderData.map(item => item.name);
  const data = orderData.map(item => item.quantity);

  const chartData = {
    series: data,
    options: {
      chart: {
        type: 'pie',
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Quantity', key: 'quantity' },
  ];

  return (
    <div className='mx-10 my-5'>
      <ReactApexChart options={chartData.options} series={chartData.series} type='pie' width={550} />
      <CSVLink data={orderData} headers={headers} className='border-gray-500 text-black p-2 border hover:bg-blue-800 hover:text-white rounded-2xl bg-blue-400 hover:border-blue-700'>
        Download CSV
      </CSVLink>
    </div>
  );
};

export default PieChart;
