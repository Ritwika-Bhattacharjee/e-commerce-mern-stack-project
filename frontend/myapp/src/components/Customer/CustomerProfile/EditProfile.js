import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const EditProfile = ({ profileData, setEditOption, userid, fetchProfile }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    const classes = useStyles();

    const [postData, setPostData] = useState({_id: userid, name: profileData.name, phone: profileData.phone, address: profileData.address});

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(postData);

        axios({
            method: "POST",
            url: "http://localhost:5000/customer/editprofile/", 
            data: postData,           
          }).then(res => {
              console.log(res.data);
              fetchProfile();
              setEditOption(null);
          });
    }

    return (
        <div style={{width: '40%', margin:'auto', marginTop:'40px'}}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    style={{width: '100%'}}
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                    name="name"
                    value={postData.name}
                    onChange={(event) => setPostData({ ...postData, name: event.target.value })}
                /><br />
                <TextField 
                    style={{width: '100%'}}
                    id="outlined-basic" 
                    label="Contact Number" 
                    variant="outlined"
                    name="phone"
                    value={postData.phone}
                    onChange={(event) => setPostData({ ...postData, phone: event.target.value })}
                /><br />
                <TextField 
                    style={{width: '100%'}}
                    id="outlined-basic" 
                    label="Address" 
                    variant="outlined"
                    name="address"
                    value={postData.address}
                    onChange={(event) => setPostData({ ...postData, address: event.target.value })}
                /><br />

                <Button style={{width: '100%'}} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>


            </form>
        </div>
    )
}

export default EditProfile;