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

import image from '../../../images/image2.JPG';

import { Button } from '@material-ui/core';
import axios from 'axios';


const EachOrder = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const [product, setProduct] = useState(null);

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
      }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
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
        expand: {
            width: '30px',
            margin: 'auto',
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
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
                                <Typography variant="subtitle1" style={{marginLeft: '20px', color: '#3CAA11'}}>
                                    <b>Expected Delivery : {order.expectedDate}</b>
                                </Typography> 
                                <div style={{display: 'flex', flexDirection: 'row', width: '120px', margin:'auto'}}>                    
                                    <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    >
                                        <ExpandMoreIcon /> 
                                </IconButton>
                                { /*<Typography variant="subtitle2" style={{marginTop: '14px'}}>
                                    {viewMsg}
                                </Typography> */}
                                </div>

                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    <Typography variant="subtitle2">Order Id: {order._id}</Typography>
                                    <Typography variant="subtitle2">Ordered On: {order.orderedOn}</Typography>
                                    <Typography variant="subtitle2">
                                        Contact No.: {order.contact}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Address: {order.address}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Status: {order.status}
                                    </Typography>
                                    </CardContent>
                                </Collapse>
                
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

export default EachOrder;