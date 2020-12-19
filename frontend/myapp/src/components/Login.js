import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LoginBox from './LoginBox.js';
import RegisterBox from './RegisterBox.js';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
//import { TextField, AppBar, Tabs, Tab } from '@material-ui/core';
//import Tabs from 'react-bootstrap/Tabs';
//import Tab from 'react-bootstrap/Tab';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
require('dotenv').config();

const Login = ({ responsesuccessGoogle, responseerrorGoogle, responseFacebook, setTokenOnSuccess, setType}) => {

  const [chosenElement, setChosenElement] = useState(< RegisterBox setTokenOnSuccess = {setTokenOnSuccess} />);

  const activateRegister = () => {
    setChosenElement(< RegisterBox setTokenOnSuccess = {setTokenOnSuccess} />);
  }

  const activateLogin = () => {
    setChosenElement(< LoginBox setTokenOnSuccess = {setTokenOnSuccess}/>);
  }

  const useStyles = makeStyles((theme) => ({
    buttons: {
       width: '50%',
       padding: '6px',
       backgroundColor: 'black',
       color: 'gold',
       border: 'none',
       cursor: 'pointer',
       fontWeight: 'bold',
    },
    accttype: {
      textAlign: 'center',
      padding: '8px',
    }
    
  }));

  const classes = useStyles();
    return (
        <div>
          <div>
            <Button className={classes.buttons} onClick={activateRegister}>Register</Button>
            <Button className={classes.buttons} onClick={activateLogin}>Login</Button>
          </div>

          <div>
            {chosenElement}
          </div>
      
      <div className={classes.accttype}>
        <p><i>Or</i></p>
      <input type="radio" id="customer" name="accttype" value="customer" checked={setType('customer')} /> Customer Account &nbsp; &nbsp;
      <input type="radio" id="seller" name="accttype" value="seller" checked={setType('seller')} /> Seller Account
      </div>

      <div style={{textAlign: 'center'}}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responsesuccessGoogle}
        onFailure={responseerrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <br /> <br />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        callback={responseFacebook} 
      />
      </div>
    </div>
    )
}

export default Login;