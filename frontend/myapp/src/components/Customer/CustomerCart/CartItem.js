import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

import { CircularProgress } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

const CartItem = ({ cart, showDetails, increaseItem, decreaseItem, deleteItem, proceedToBuy }) => {

    // function to find the details of the current product id

    const [product, setProduct] = useState(null);

    const getProductDetails = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/product/getoneproduct/"+cart.item, 
          }).then(res => {
              console.log(res.data);
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
        }
      }));

      const classes = useStyles();

    return (
        <div>
        {
            product ? (
                <div className={classes.container}>
            <Card className={classes.root}>
                <CardMedia
                    onClick = {e => showDetails(product)}
                    className={classes.cover}
                    image={product.picture}
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
                    <div>
                    <IconButton aria-label="previous" onClick = {e => increaseItem(product._id, product.price)}>
                        <AddIcon /> 
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick = {e => decreaseItem(product._id, product.price)}>
                        <SubtractIcon />
                    </IconButton>
                    <IconButton aria-label="next" onClick = {e => deleteItem(cart.quantity, product._id, product.price)}>
                        <DeleteIcon />
                    </IconButton>
                    </div>

                    </div>
                </div>
                <div style={{marginTop: '50px', display:'flex', flexDirection:'column'}}>
                    <Typography variant="subtitle1">
                        Qty: {cart.quantity}
                    </Typography>
                    <Typography variant="subtitle1">
                        Total Price: Rs. {parseInt(cart.quantity) * parseInt(product.price)}
                    </Typography>
                    <Button style={{backgroundColor: '#FFC300'}} onClick = {e => proceedToBuy(product, cart.quantity)}>Proceed to Buy</Button>
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
export default CartItem;