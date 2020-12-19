import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';

const EachProduct = ({ product, userid }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 250,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
        avatar: {
          backgroundColor: red[500],
          width: '150px',
          height: '50px',
          borderRadius: '20%',
        },
        cart: {
          color: '#D41818',
          backgroundColor: '#FFC300',
          borderRadius: '10%',
          padding: '7px',
          fontSize: '20px',
        },
        quantity:{
          marginLeft: '10px',
        }
      }));
      
      
        const classes = useStyles();
        const [expanded, setExpanded] = useState(false);
        const [quantity, setQuantity] = useState(1);
        const [message, setMessage] = useState("");
      
        const handleExpandClick = () => {
          setExpanded(!expanded);
        }

        const addToCart = () => {
          console.log("Add to cart function called with userid: ", userid);

          axios({
            method: "POST",
            url: "http://localhost:5000/cart/add/", 
            data: {userid: userid, productid: product._id, quantity: quantity, cost: product.price}           
          }).then(res => {
              console.log(res.data);
              if(!res.data.error){
                setMessage("Product Added to Cart");
              }else{
                setMessage("Could not add product to Cart!");
              }
          });
        }
    return (
        <div>

 
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Rs. {product.price}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.title}
        subheader={product.brand}
      />
      <CardMedia
        className={classes.media}
        image={product.picture}
        title={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <div className = {classes.quantity}>
      Qty: <input style={{width: '30px'}} type="number" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" className = {classes.cart} onClick={addToCart}>
          <FavoriteIcon /> Add to Cart
        </IconButton>
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
      </CardActions>
      <div style={{color: "#39A410", marginLeft: '10px'}}>
        <Typography paragraph><b>{message}</b></Typography>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Highlights:</Typography>
          <Typography paragraph>
            {product.highlights.map((highlight) => `~\n\n${highlight} \n`)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        </div>
    )
}

export default EachProduct;