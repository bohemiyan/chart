import React, { useState,useEffect } from 'react';
import axios from 'axios';
import SalesBarChart from '../Charts/Graphs/Graph';
import SalesPieChart from '../Charts/pieChart/PieChart';
import './salesform.css';
import MonthlySalesPieChart from '../Charts/monthlyPi/MonthlyPie';
import ProductSalesPieChart from '../Charts/productPie/ProductPi';
import SalesLineChart from '../Charts/LineGraph/LineGraph';
import { data } from '../../asset/data';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


const SalesForm = () => {
  const [products, setProducts] = useState([
    { productName: '', salesData: new Array(12).fill(0) },
  ]);

  useEffect(() => {
    const dat=data;
    setProducts(dat);
  }, [])
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(products)
    // try {
    //   await axios.post('/api/sales', products);
    //   // reset the form fields
    //   setProducts([{ productName: '', salesData: new Array(12).fill(0) }]);
    //   alert('Sales data submitted successfully!');
    // } catch (err) {
    //   console.error(err);
    //   alert('Error submitting sales data');
    // }
  };

  const handleChange = (e, i, j) => {
    const { value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[i].salesData[j] = Number(value);
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productName: '', salesData: new Array(12).fill(0) }]);
  };

  const deleteProduct = (i) => {
    const updatedProducts = [...products];
    updatedProducts.splice(i, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <div className='Form'>
    <form className="sales-form" onSubmit={handleSubmit}>
     <h2>ADD PRODUCTS</h2> 
      <table className="sales-table">
        <thead>
          <tr>
            <th className="product-name">Product Name</th>
            {monthNames.map((monthName) => (
              <th key={monthName} className="month-name">{monthName}</th>
            ))}
            <th className="delete-btn">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) => {
                    const updatedProducts = [...products];
                    updatedProducts[i].productName = e.target.value;
                    setProducts(updatedProducts);
                  }}
                  className="product-input"
                  required
                />
              </td>
              {product.salesData.map((sale, j) => (
                <td key={j}>
                  <input
                    type="number"
                    value={sale}
                    onChange={(e) => handleChange(e, i, j)}
                    className="sale-input"
                    required
                  />
                </td>
              ))}
              <td>
                <button type="button" className="delete-product-btn" onClick={() => deleteProduct(i)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-buttons">
        <button type="button" className="add-product-btn" onClick={addProduct}>Add Products</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
    </div>




     <SalesLineChart data={products}/>           
    <SalesBarChart data={products}/>
    <SalesPieChart data={products}/>
    <MonthlySalesPieChart data={products}/>
    <ProductSalesPieChart data={products}/>

    </div>
    
  );
};

export default SalesForm;
