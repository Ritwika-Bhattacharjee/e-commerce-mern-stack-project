import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';


const RegisterBox = ({ setTokenOnSuccess }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [chosentype, setChosenType] = useState("customer");

    const updateType = (event) => {
      console.log(event.target.value);
      setChosenType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting register form!!!");
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/register",
            data: { name: name, email: email, password: password, type: chosentype},
            
          }).then(res => {
              if(res.data.message == ""){
                console.log("User Registration done Successfully!", res.data.user._id, res.data.user.name, res.data.user.type);
                setTokenOnSuccess(res.data.user._id, res.data.user.name, res.data.user.type);
              }else{
                setErrMsg(res.data.message);
              }
          });
    } 

    return(
        <div>
        <p style={{textAlign: 'center', marginTop: '20px'}}> <i>Register Now </i></p>
        <form onSubmit={handleSubmit}>
            <div style={{textAlign: 'center', padding: '8px'}}> 
            <input type="radio" id="customer" name="accttype" value="customer" onChange={updateType} /> Customer Account &nbsp; &nbsp;
            <input type="radio" id="seller" name="accttype" value="seller" onChange={updateType} /> Seller Account <br />
            </div>
            <div style={{textAlign: 'center', width: '80%', margin: 'auto'}}>
            { /*<input type="text" name="name" placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)}/><br></br>
            <input type="email" name="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)}/><br></br>
            <input type="password" name = "password" placeholder="Choose a Password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>
    <input type = "submit" value="Register"/> */ }
            <TextField 
                    name="name" 
                    variant="outlined"
                    label="Your Name"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

            <TextField 
                    name="email" 
                    type="email"
                    variant="outlined"
                    label="Your Email"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

            <TextField 
                    name="password" 
                    type="password"
                    variant="outlined"
                    label="Choose a Password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Register</Button>

            </div>
        </form>
        <p style={{padding: '10px', textAlign: 'center', color:'maroon', fontWeight: 'bold'}}>{errMsg}</p>
        </div>
    )
}

export default RegisterBox;