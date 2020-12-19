import React, { useState, useEffect } from 'react';
import CustomerGrid from './CustomerGrid.js'
import Products from './Products/products.js';
import axios from 'axios';
import SearchBar from './SearchBar';

const CustomerHome = ({ userid }) => {

    const [selectedGrid, setSelectedGrid] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCategoryItems();
        }, [selectedGrid])

    const getCategoryItems = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/customer/getcategoryitems/"+selectedGrid,            
          }).then(res => {
              console.log(res.data);
              setProducts(res.data);
          });
    }

    return (
        <div>
            <h3>This is Customer Home</h3>
            { /*search bar implementation*/ }
            <div style={{marginTop: '100px', marginLeft:'20px'}}>
            <SearchBar setProducts={setProducts} />
            </div>
            {
                !selectedGrid && products.length==0 ? (
                    <CustomerGrid setSelectedGrid={setSelectedGrid} />
                ):(
                    <Products userid={userid} products={products} setSelectedGrid={setSelectedGrid} setProducts={setProducts} />
                )
            }
        </div>
    )
}

export default CustomerHome;