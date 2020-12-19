import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DisplayProfile = ({ profileData, setEditOption }) => {

    const useStyles = makeStyles({
        root: {
          minWidth: 275,
          marginTop: '40px',
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        container:{
           width: '40%',
           margin: 'auto', 
        }
      });

      const classes = useStyles();
    return (
        <div className={classes.container}>

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Profile Information
                </Typography>
                <Typography variant="h5" component="h2">
                {profileData.name}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                Contact Number:
                </Typography>
                <Typography className={classes.pos}>
                {profileData.phone}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                Address:
                </Typography>
                <Typography variant="body2" component="p">
                {profileData.address}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick = { e => setEditOption(true)} style={{color: '#1F087C'}}><b>Edit Profile</b></Button>
            </CardActions>
            </Card>
        </div>
    )
}

export default DisplayProfile;