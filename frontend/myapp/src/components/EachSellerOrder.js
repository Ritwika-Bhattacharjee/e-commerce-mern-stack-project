import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';


const EachSellerOrder = ({ order, editOrder }) => {
    const [product, setProduct] = useState(null);
    const [edit, setEdit] = useState(false);
    const [payment, setPayment] = useState(order.payment);
    const [status, setStatus] = useState(order.status);
    const [expectedDate, setExpectedDate] = useState(order.expectedDate);

    const getProductDetails = () => {
        console.log("Calling get product details");
        axios({
            method: "GET",
            url: "http://localhost:5000/product/getoneproduct/"+order.item, 
          }).then(res => {
              if(!res.data.error){
                setProduct(res.data);
              }
          });
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
          },      
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: '45%',
          height: '420px',
          cursor: 'pointer',
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
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
            justifyContent: 'center',
        },
      }));

      const classes = useStyles();

    return (        
        <div>

            {
                product ? (
                    <div className={classes.container}>
                        <Card className={classes.root}>
                            <img
                                className={classes.cover}
                                src={product.picture}
                                title="Product Details"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    {product.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.price}>
                                    Rs. {product.price}
                                </Typography>
                                </CardContent>
                                <div className={classes.controls}>
                                
                                <Typography variant="subtitle1" style={{marginLeft: '15px', marginRight: '50px'}}>
                                    Qty: {order.quantity}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Total Price: {order.amount}
                                </Typography> 

                                </div>

                                {
                                    !edit ? (
                                        <div style={{display: 'flex', flexDirection:'row'}}>
                                        <div>   
                                            <Typography variant="subtitle1" style={{marginLeft: '20px'}}>
                                                <b> Payment: </b>{order.payment} 
                                            </Typography> 
                                            <Typography variant="subtitle1" style={{marginLeft: '20px'}}>
                                                <b> Status: </b>{order.status} 
                                            </Typography>
                                            <Typography variant="subtitle1" style={{marginLeft: '20px'}}>
                                                    <b>Expected Delivery : </b>{order.expectedDate}
                                            </Typography>
                                        </div> 
                                        <div>
                                            <Button style={{backgroundColor: '#FFC300'}} onClick={e => setEdit(true)}> <EditIcon /> Edit </Button>
                                        </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                                                <TextField 
                                                    name="payment" 
                                                    variant="outlined"
                                                    label="Payment"
                                                    fullWidth
                                                    value={payment}
                                                    onChange={(event) => setPayment(event.target.value)}
                                                />

                                                <TextField 
                                                    name="status" 
                                                    variant="outlined"
                                                    label="Status"
                                                    fullWidth
                                                    value={status}
                                                    onChange={(event) => setStatus(event.target.value)}
                                                />

                                                <TextField 
                                                    name="expdate" 
                                                    variant="outlined"
                                                    label="Expected Date for Delivery"
                                                    fullWidth
                                                    value={expectedDate}
                                                    onChange={(event) => setExpectedDate(event.target.value)}
                                                />

                                                <Button style={{backgroundColor: '#FFC300', margin: '10px'}} onClick={(e) => {editOrder(order._id, payment, status, expectedDate); setEdit(false)}}>Update</Button>
                                                <Button style={{backgroundColor: '#FFC300', margin: '10px'}} onClick={e => setEdit(false)}>Cancel</Button>
                                            </form>

                                        </div>
                                    )
                                }

                                    <CardContent>
                                    <Typography variant="subtitle2">Order Id: {order._id}</Typography>
                                    <Typography variant="subtitle2">Ordered On: {order.orderedOn}</Typography>
                                    <Typography variant="subtitle2">
                                        Contact No.: {order.contact}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Address: {order.address}
                                    </Typography>
                                    </CardContent>
                
                            </div>
                        </Card>
                    </div>

                ) : (
                    <CircularProgress />
                )
            }
        </div>
    )
}

export default EachSellerOrder;