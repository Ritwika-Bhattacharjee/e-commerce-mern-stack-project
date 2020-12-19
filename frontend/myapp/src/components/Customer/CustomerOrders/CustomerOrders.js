import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { CircularProgress } from '@material-ui/core';
import EachOrder from './EachOrder';

const CustomerOrders = ({ userid }) => {

    const [orders, setOrders] = useState(null);

    const getAllOrders = () => {
        console.log("Calling get all orders function");
        axios({
            method: "GET",
            url: "http://localhost:5000/order/getorders/"+userid, 
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                setOrders(res.data);
              }
          });
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div style={{marginTop: '200px'}}>
        {
            !orders ? (
                <CircularProgress />
            ): (
                <div style = {{ width: '90%', margin: 'auto'}}>
                {
                    orders.map((order) => (
                        <EachOrder order={order} />
                       ))
                }
                </div>
            )
        }
        </div>
    )
}

export default CustomerOrders;