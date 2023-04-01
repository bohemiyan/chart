import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./productpi.css";

const ProductSalesPieChart = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState();


  useEffect(() => {
    if(!selectedProduct){
    const first=data[0].productName;
    setSelectedProduct(first);
    }
    
  }, [data])
  
 


  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

   const product = data.find((p) => p.productName === selectedProduct);

    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: product.productName,
          data: product.salesData,
          backgroundColor: Array.from({ length: 12 }, getRandomColor),
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Sales per month for ${product.productName}`,
          fontSize: 16,
        },
        tooltips: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.formattedValue}`,
          },
        },
      },
    };

    const myChartRef = chartRef.current.getContext("2d");
    const myChart = new Chart(myChartRef, {
      type: "pie",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      myChart.destroy();
    };
  }, [data,selectedProduct]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  

  return (
    <div className="ProductPi">
    <div>
      {data.map((product, index) => (
        <label key={product.productName}>
          <input
            type="radio"
            name="products"
            value={product.productName}
            checked={selectedProduct === product.productName}
            onChange={handleProductChange}
          />
          {product.productName}
        </label>
      ))}
    </div>
    <canvas ref={chartRef} />
  </div>
  
  
  );
};

export default ProductSalesPieChart;
