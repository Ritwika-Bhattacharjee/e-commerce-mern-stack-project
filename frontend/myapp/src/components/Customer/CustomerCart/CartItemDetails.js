import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

const CartItemDetails = ({ product, setDetails}) => {

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
          height: '100%',
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
        }
      }));

      const classes = useStyles();

    return (
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
                    <Typography variant="subtitle1" style={{marginTop: '30px'}}>
                        <b>Product Highlights: </b>
                    </Typography>
                   
                    {
                        product.highlights.map((highlight) => (
                            <Typography variant="subtitle1" color="textSecondary">
                            ~{highlight}
                            </Typography>
                        ))
                    }
                    <Button onClick={e => setDetails(false)} style={{backgroundColor: '#FFC300', marginTop: '30px'}}>Back to Cart</Button>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default CartItemDetails;