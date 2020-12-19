import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import image1 from '../../../images/image1.JPG';
import image2 from '../../../images/image2.JPG';
import image3 from '../../../images/image3.JPG';
import image4 from '../../../images/image4.JPG';
import image5 from '../../../images/image5.JPG';
import image6 from '../../../images/image6.JPG';
import GridItem from './GridItem.js';
import useStyles from './gridstyles.js';

const CustomerGrid = ({ setSelectedGrid }) => {

    const classes = useStyles();

    const allCategories = [
        {
            _id: 1,
            title: "Men's Wear",
            image: image1,
        },
        {
            _id: 2,
            title: "Women's Wear",
            image: image2,
        },
        {
            _id: 3,
            title: "Home Decor and Furnishing",
            image: image3,
        },
        {
            _id: 4,
            title: "Electronics",
            image: image4,
        },
        {
            _id: 5,
            title: "Baby Products",
            image: image5,
        },
        {
            _id: 6,
            title: "Sports, Bags, Shoes and Fitness",
            image: image6,
        },
    ]

    return (
        <div>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {allCategories.map((category) => (
                    <Grid key={category._id} item xs={12} sm={6}>
                        <GridItem image={category.image} title={category.title} id={category._id} setSelectedGrid={setSelectedGrid} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default CustomerGrid;