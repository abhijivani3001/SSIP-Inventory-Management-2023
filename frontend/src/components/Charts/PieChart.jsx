import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ orderData }) => {
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

  return (
    <div className='mx-10 my-5'>
      <ReactApexChart options={chartData.options} series={chartData.series} type='pie' width={550} />
    </div>
  );
};

export default PieChart;
