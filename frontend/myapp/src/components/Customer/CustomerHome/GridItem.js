import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import useStyles from './itemstyles.js';

const GridItem= ({ image, title, id, setSelectedGrid }) => {
    
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={image} title={title}/>
            <div className = {classes.overlay}>
                <Typography variant="h4">{title}</Typography>
            </div>
            <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" className={classes.buttonStyles} onClick={()=> setSelectedGrid(title)}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; SHOP &nbsp;
            </Button>
            </CardActions>
        </Card>
    )
}

export default GridItem;