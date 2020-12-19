import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';

import CartItem from './CartItem';
import CartItemDetails from './CartItemDetails';
import CartBuy from './CartBuy';
import CustomerHome from '../CustomerHome/CustomerHome.js'

const CustomerCart = ({ userid, setSelectedButton }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
          width: '65%',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        container: {
            width: '80%',
            margin: 'auto',
        },
        price: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'maroon',
            padding: '10px',
            width: '70px',
            borderRadius: '15%',
        }
      }));

      const classes = useStyles();

      const [cartDetails, setCartDetails] = useState(null);
      const [details, setDetails] = useState(false);
      const [productDetails, setProductDetails] = useState(null);
      const [buy, setBuy] = useState(false);
      const [item, setItem] = useState(null);

      const getCartDetails = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/cart/fetch/"+userid, 
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                setCartDetails(res.data);
              }
          });
      }

      useEffect(() => {
        getCartDetails();
        }, []);

      const showDetails = (product) => {
          setDetails(true);
          setProductDetails(product);
      }

      const increaseItem = (itemid, price) => {
          console.log("increase item function called with", itemid, ":", price);
          axios({
            method: "POST",
            url: "http://localhost:5000/cart/increaseItem/", 
            data: {itemid: itemid, userid: userid, price: price},
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                getCartDetails();
              }
          });
      }

      const decreaseItem = (itemid, price) => {
          console.log("decrease item function called with", itemid, ":", price);
          axios({
            method: "POST",
            url: "http://localhost:5000/cart/decreaseItem/", 
            data: {itemid: itemid, userid: userid, price: price},
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                getCartDetails();
              }
          });
      }

      const deleteItem = (quantity, itemid, price) => {
          console.log("delete item function called with", itemid, ":", price);
          axios({
            method: "POST",
            url: "http://localhost:5000/cart/deleteItem/", 
            data: {itemid: itemid, userid: userid, price: price, quantity: quantity},
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                getCartDetails();
              }
          });
      }

      const proceedToBuy = (item, quantity) => {
        setBuy(true);
        item.quantity = quantity;
        setItem(item);
      }

      const returnAfterOrder = (quantity, itemid, price) => {
        //setBuy(false);
        //setItem(null);
        deleteItem(quantity, itemid, price);
        setSelectedButton(<CustomerHome userid = {userid} />)
      }

    return (
        <div  style={{marginTop: '200px'}} className={classes.container}>
            {
            cartDetails && !details && !buy ?  (
            <div>
            <p>Total Items in Cart: {cartDetails.totalItems}</p>
            <p>Total Cost: {cartDetails.totalCost}</p>
                {
                cartDetails.items.map((cart) => (
                    <CartItem cart={cart} showDetails={showDetails} increaseItem={increaseItem} decreaseItem={decreaseItem} deleteItem={deleteItem} proceedToBuy = {proceedToBuy} />
                   ))
                }
            </div>
            ) : details ?(
                <CartItemDetails product={productDetails} setDetails={setDetails} />
            ) : buy && item ? (
                <CartBuy product={item} setBuy = {setBuy} setItem = {setItem} userid={userid} returnAfterOrder={returnAfterOrder}/>
            ) :
            (
                <CircularProgress /> 
            )
            }
           

        </div>
    )
}

export default CustomerCart;