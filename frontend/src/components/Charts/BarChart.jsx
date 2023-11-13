// BarChart.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ orderData }) => {
  // Aggregate data for the bar chart
  const data = orderData.map(({ x, y }) => ({ x, y }));

  return (
    <div className='mx-10 my-5'>
      <ReactApexChart
        options={{
          chart: {
            type: 'bar',
          },
          xaxis: {
            type: 'category',
          },
        }}
        series={[{ data }]}
        type='bar'
        width={800}
      />
    </div>
  );
};

export default BarChart;
