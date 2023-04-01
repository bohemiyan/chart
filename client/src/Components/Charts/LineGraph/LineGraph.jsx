import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./saleslinechart.css";

const SalesLineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Total Sales",
          data: data.reduce(
            (acc, cur) => acc.map((val, i) => val + cur.salesData[i]),
            Array.from({ length: 12 }, () => 0)
          ),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Total Sales for the Year`,
          fontSize: 16,
        },
        legend: {
          display: false,
        },
      },
    };
    const myChartRef = chartRef.current.getContext("2d");
    const myChart = new Chart(myChartRef, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div className="SalesLineChart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SalesLineChart;
