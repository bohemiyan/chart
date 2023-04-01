import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import './grph.css'

const SalesBarChart = ({ data }) => {
  const chartRef = useRef(null);
  let myChart;

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

    const chartData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: data.map((product, index) => {
        const red = (index  * 5000) % 255;
        const green = (index  * 50) % 255;
        const blue = (index * 30) % 255;
        return {
          label: product.productName,
          backgroundColor: `rgba(${red}, ${green}, ${blue}, 1)`,
          borderColor: `rgba(${red}, ${green}, ${blue}, 0.8)`,
          borderWidth: 1,
          data: product.salesData,
        };
      }),
    };

    const myChartRef = chartRef.current.getContext("2d");

    myChart = new Chart(myChartRef, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        indexAxis: "x",
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <div className="BarGraph" > <canvas ref={chartRef} /> </div>;
};

export default SalesBarChart;
