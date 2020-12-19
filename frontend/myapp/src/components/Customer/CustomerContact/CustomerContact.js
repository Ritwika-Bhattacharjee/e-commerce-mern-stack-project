import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import image from '../../../images/background.jpg';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Shopaholic
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const CustomerContact = ({ userid }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          height: '100vh',
        },
        image: {
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
          backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.8',
        },
        paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      
      const classes = useStyles();

      const [name, setName] = useState(null);
      const [email, setEmail] = useState(null);
      const [message, setMessage] = useState(null);
      const [response, setResponse] = useState(null);

      const sendMessage = (event) => {
          event.preventDefault();
          console.log("Frontend send message function called");
          axios({
            method: "POST",
            url: "http://localhost:5000/customer/sendMessage",
            data: {name: name, email: email, message: message},
          }).then((res) => {
            console.log(res.data);
            if (!res.data.error) {
              setResponse("Message Sent Successfully!");
              setName(null);
              setEmail(null);
              setMessage(null);
            } else {
              setResponse("Error in sending message. Please try again!");
            }
            setTimeout(function(){
                setResponse(null);
            },5000);
          });
      }

    return (
        <div style={{marginTop: '150px'}}>
            <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Write to Us
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Your Name"
              name="name"
              value={name}
              onChange = {e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Your Email"
              value = {email}
              onChange = {e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={3}
              name="message"
              label="Your Message/Complaint"
              value = {message}
              onChange = {e => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {sendMessage}
            >
              Send Message
            </Button>
            <Typography variant="subtitle2" style={{textAlign:'center', color:'#12B325'}}><b>{response}</b></Typography>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
        </div>
    )
} 

export default CustomerContact;