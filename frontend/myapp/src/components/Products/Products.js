import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
//import { useSelector } from 'react-redux';
import Product from './Product/Product.js';
import useStyles from './styles.js';

const Products= ({ setCurrentId, allProducts }) => {
    const classes = useStyles();

    //const posts = useSelector((state) => state.posts); //we use state.posts as in the index.js file of reducers we exported posts
    return (
        !allProducts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {allProducts.map((product) => (
                    <Grid key={product._id} item xs={12} sm={6}>
                        <Product product={product} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Products;