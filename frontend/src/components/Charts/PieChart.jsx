// PieChart.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ orderData }) => {
  // Aggregate data for the pie chart
  const data = orderData.map(({ name, quantity }) => ({ x: name, y: quantity }));

  return (
    <div className='mx-10 my-5'>
      <ReactApexChart
        options={{
          chart: {
            type: 'pie',
          },
        }}
        series={data}
        type='pie'
        width={400}
      />
    </div>
  );
};

export default PieChart;
