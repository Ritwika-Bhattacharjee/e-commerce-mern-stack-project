import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Form from './Form/Form.js';
import Products from './Products/Products.js';
import useStyles from './styles.js';
import memories from '../images/memories.jpg';
import axios from 'axios';

const SellerProducts = ({ userid }) => {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
        }, [currentId])

    const getAllProducts = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/product/getproducts",
            data: {userid: userid},
            
          }).then(res => {
              console.log(res.data);
              setAllProducts(res.data);
          });
    }

    return(
        <Container maxWidth="lg">
            
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Products setCurrentId={setCurrentId} allProducts={allProducts} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} userid = {userid} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default SellerProducts;