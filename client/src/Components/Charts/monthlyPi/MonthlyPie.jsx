import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import './monthlypi.css'

const MonthlySalesPieChart = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    const chartData = {
      labels: data.map((product) => product.productName),
      datasets: [
        {
          data: data.map((product) => product.salesData[selectedMonth]),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#8aff9f"],
          hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#8aff9f"],
        },
      ],
    };

    const myChartRef = chartRef.current.getContext("2d");
    const myChart = new Chart(myChartRef, {
      type: "pie",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Sales for ${getMonthName(selectedMonth)}`,
            fontSize: 16,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data, selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  return (
    <div className="MonthlyPi">
     
      <div>
        {Array.from({ length: 12}, (_, i) => {
          const monthIndex = i;
          return (
            <label key={monthIndex}>
              <input
                type="radio"
                name="month"
                value={monthIndex}
                checked={selectedMonth === monthIndex}
                onChange={handleMonthChange}
              />
              {getMonthName(monthIndex)}
            </label>
          );
        })}
      </div>
      <canvas ref={chartRef} width={400} height={400} />
    </div>
  );
};

export default MonthlySalesPieChart;
