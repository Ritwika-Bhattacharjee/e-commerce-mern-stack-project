import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import axios from 'axios';

import { Button } from '@material-ui/core';

const CartBuy = ({ product, setBuy, setItem, userid, returnAfterOrder }) => {

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
          width: '50%',
          //height: '100%',
          crop: 'fill',
          cursor: 'pointer',
          minHeight: 500,
        },
        container: {
            width: '100%',
            margin: 'auto',
        },
        price: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'maroon',
            padding: '10px',
            width: '90px',
            borderRadius: '15%',
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
            //justifyContent: 'center',
            marginTop: '30px',
        },
      }));

      const classes = useStyles();

      const [phno, setPhno] = useState(null);
      const [addr, setAddr] = useState(null);
      const [orderMsg, setOrderMsg] = useState(null);

      const getUserDetails = () => {
        console.log("Calling get profile function");
        axios({
            method: "GET",
            url: "http://localhost:5000/customer/getprofile/"+userid, 
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                setPhno(res.data.phone);
                setAddr(res.data.address);
              }
          });
      }

      useEffect(() => {
        getUserDetails();
        }, []);

      const placeOrder = () => {
          console.log("Place Order function clicked");
          axios({
            method: "POST",
            url: "http://localhost:5000/order/placeOrder/", 
            data: {item: product._id, 
                   quantity: product.quantity, 
                   amount: parseInt(product.quantity)*parseInt(product.price),
                   contact: phno,
                   address: addr,
                   customerid: userid,
                   sellerid: product.userid,
            }
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                setOrderMsg(`Order id: ${res.data._id} placed succesfully`);
                setTimeout(function(){
                    returnAfterOrder(product.quantity, product._id, product.price);
                },4000);
              }else{
                setOrderMsg('Error in placing Order'); 
              }
          });
      }

    return(

        <div>
        <Card className={classes.root}>
            <img src = {product.picture} className={classes.cover}/>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {product.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {product.brand}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {product.description}
                </Typography>
                <Typography variant="subtitle1" className={classes.price}>
                    Rs. {product.price}
                </Typography>
                <Typography variant="subtitle1">
                    No of Items: {product.quantity}
                </Typography>
                <Typography variant="subtitle1" style={{marginTop: '10px'}}>
                    <b>Product Highlights: </b>
                </Typography>
            
                {
                    product.highlights.map((highlight) => (
                        <Typography variant="subtitle1" color="textSecondary">
                        ~{highlight}
                        </Typography>
                    ))
                }
                <Typography variant="subtitle1" style={{backgroundColor: 'lightgreen', textAlign:'center', padding: '10px'}}>
                   <b> Total Cost: Rs. {parseInt(product.quantity)*parseInt(product.price)} </b>
                </Typography>

                <form autoComplete="off" noValidate className={classes.form}>
                <Typography variant="subtitle1" color="textSecondary">
                    Contact Number:
                </Typography>   
                <TextField 
                    name="phno" 
                    variant="outlined"
                    label=""
                    fullWidth
                    value={phno}
                    onChange={(event) => setPhno(event.target.value)}
                />

                <Typography variant="subtitle1" color="textSecondary">
                    Delivery Address:
                </Typography>  
                <TextField 
                    name="addr" 
                    variant="outlined"
                    label=""
                    fullWidth
                    multiline
                    rows = {2}
                    value={addr}
                    onChange={(event) => setAddr(event.target.value)}
                />
                </form>

                <div style = {{textAlign: "center"}}>
                <Button onClick={(e) => {setBuy(false); setItem(null);}} style={{backgroundColor: '#FFC300', margin: '10px', width: '170px'}}>Back to Cart</Button>
                <Button onClick={placeOrder} style={{backgroundColor: '#FFC300', margin: '10px', width: '170px'}}>Place Your Order</Button>
                </div>

                <Typography variant="subtitle1" style={{textAlign:'center', color: '#3CAA11'}}>
                    <b>{orderMsg} </b>
                </Typography>
                </CardContent>
            </div>
        </Card>
        </div>
    )
}

export default CartBuy;