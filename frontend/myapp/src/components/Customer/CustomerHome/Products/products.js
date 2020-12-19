import React from 'react';
import EachProduct from './EachProduct.js';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Products = ({ userid, products, setSelectedGrid, setProducts }) => {

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          alignItems: 'center',
          marginLeft: '20px',
          marginRight: '20px',
        },
        smMargin: {
          margin: theme.spacing(1),
        },
        actionDiv: {
          textAlign: 'center',
        },
      }));

      const classes = useStyles();
    return (
    <div>
        <Button onClick={() => {setSelectedGrid(null); setProducts([]); }} style={{backgroundColor: 'gold', marginLeft:'30px'}}>Back to Categories</Button>
         {   
        !products.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {products.map((product) => (
                    <Grid key={product._id} item xs={12} sm={6} md={4}>
                        <EachProduct product={product} userid={userid}/>
                    </Grid>
                ))}
            </Grid>
    )}
    </div>
    )
}

export default Products;