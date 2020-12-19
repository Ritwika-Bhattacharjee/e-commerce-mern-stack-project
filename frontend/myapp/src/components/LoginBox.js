import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const LoginBox = ({ setTokenOnSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting login form!!!");
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/login",
            data: { email: email, password: password},
            
          }).then(res => {
              if(res.data.message == ""){
                console.log("User Login done Successfully!", res.data.user._id, res.data.user.name, res.data.user.type);
                setTokenOnSuccess(res.data.user._id, res.data.user.name, res.data.user.type);
              }else{
                setErrMsg(res.data.message);
              }
          });
    } 

    return(
        <div>
        <p style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}> <i>Login Here</i> </p>
        <form onSubmit={handleSubmit}>
            <div style={{textAlign: 'center', width: '80%', margin: 'auto'}}>
            { /*<input type="email" name="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)}/><br></br>
            <input type="password" name="password" placeholder="Enter your Password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>
    <input type = "submit" value="Login"/> */ }
            <TextField 
                    name="email" 
                    type="email"
                    variant="outlined"
                    label="Your Registered Email"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

            <TextField 
                    name="password" 
                    type="password"
                    variant="outlined"
                    label="Enter your Password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Login</Button>

            </div>
        </form>
        <p style={{padding: '10px', textAlign: 'center', color:'maroon', fontWeight: 'bold'}}>{errMsg}</p>
        </div>
    )
}

export default LoginBox;