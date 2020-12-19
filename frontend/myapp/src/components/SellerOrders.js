import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import EachSellerOrder from './EachSellerOrder';

const SellerOrders = ({ userid }) => {

    const [orders, setOrders] = useState(null);

    const getAllOrders = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/order/getordersSeller/"+userid,
            
          }).then(res => {
              console.log(res.data);
              setOrders(res.data);
          });
    }

    useEffect(() => {
        getAllOrders();
        }, [])

    const editOrder = (id, payment, status, expectedDate) => {
        console.log("Calling edit order function");
        axios({
            method: "POST",
            url: "http://localhost:5000/order/editOrder/", 
            data: {_id: id, payment: payment, status: status, expectedDate: expectedDate},
            }).then(res => {
                console.log(res.data)
                if(!res.data.error){
                    getAllOrders();
                }
            });
    }

    return(
        <div>
        {
            !orders ? (
                <CircularProgress />
            ): (
                <div style = {{ width: '90%', margin: 'auto'}}>
                {
                    orders.map((order) => (
                        <EachSellerOrder order={order} editOrder={editOrder} />
                       ))
                }
                </div>
            )
        }
        </div>
    )
}

export default SellerOrders;