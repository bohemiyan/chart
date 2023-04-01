import React from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css';

const PieChart = ({ data }) => {
  const labels = data.map((item) => item.productName);
  const salesData = data.map((item) => item.salesData.reduce((a, b) => a + b, 0));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales Data',
        data: salesData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
   
      <div className="pieChart">
        <Pie className='Pie' data={chartData} />
      </div>
    
  );
};
export default PieChart;
