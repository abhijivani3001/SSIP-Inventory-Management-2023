// BarChart.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CSVLink } from 'react-csv';

const BarChart = ({ orderData }) => {
  console.log(orderData);
  const data = orderData.map(({ x, y }) => ({ x, y }));

  const headers = [
    { label: 'Date', key: 'x' },
    { label: 'Quantity', key: 'y' },
  ];

  return (
    <div className='mx-10 my-5'>
      <ReactApexChart
        options={{
          chart: {
            type: 'bar',
          },
          xaxis: {
            type: 'Date',
          },
        }}
        series={[{ data }]}
        type='bar'
        width={600}
      />
      <CSVLink data={orderData} headers={headers} className='border-gray-500 text-black p-2 border hover:bg-blue-800 hover:text-white rounded-2xl bg-blue-400 hover:border-blue-700'>
        Download CSV
      </CSVLink>
    </div>
  );
};

export default BarChart;
