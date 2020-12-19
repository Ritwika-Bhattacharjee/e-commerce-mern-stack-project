import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; 
import moment from 'moment';
import axios from 'axios';

import useStyles from './styles.js';

const Product= ({ product, setCurrentId }) => {
    const classes = useStyles();
    //const dispatch = useDispatch();

    const deleteProducts = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/product/deleteproduct",
            data: {_id: product._id},
            
          }).then(res => {
              console.log("Product deleted successfully ",res.data);
              setCurrentId(null);
          });
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={product.picture} title={product.title}/>
            <div className = {classes.overlay}>
                <Typography variant="body2">{product.brand}</Typography>
                <Typography variant="h7">{product.title}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={()=> setCurrentId(product._id)}>
                    Edit
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="p">{product.description}</Typography>
            </div>
            <Typography className={classes.title} variant="h4" gutterBottom>Rs. {product.price}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary">{product.highlights.map((highlight) => `~\n\n${highlight} \n`)}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" >
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                </Button>
                <Button size="small" color="primary">
                    <DeleteIcon fontSize="small" onClick = {deleteProducts}/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product;