import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles.js';
import axios from 'axios';


const Form = ({ currentId, setCurrentId, userid }) => {
    const [postData, setPostData] = useState({title: '', description: '', price: '', brand: '', tags: '', category: '', picture: '', highlights: '', userid: userid});
    const classes = useStyles();

    useEffect(() => {
        console.log("calling getoneproduct");
        axios({
            method: "GET",
            url: "http://localhost:5000/product/getoneproduct/"+currentId,            
          }).then(res => {
              // console.log(res.data);
              console.log(currentId);
              if(currentId){
                setPostData(res.data);
              }
          });
    }, [currentId])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Seller id frontend: ", postData.userid);

        
        if (currentId) {
            axios({
                method: "POST",
                url: "http://localhost:5000/product/updateproduct",
                data: { ...postData, _id: currentId }
                
              }).then(res => {
                  console.log("Product updated successfully", res.data);
                  clear();
              });
        } else {
            axios({
            method: "POST",
            url: "http://localhost:5000/product/createproduct",
            data: postData,
            
          }).then(res => {
              if(res.data.error == ""){
                console.log("Product creation done Successfully!", res.data._id);
                clear();
              }else{
                console.log(res.data.error);
              }
          });  
        }
        

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', description: '', price: '', brand: '', tags: '', category: '', picture: '', highlights: ''});
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant="h6">{ currentId ? 'Editing a ' : 'Uploading a new ' }Product</Typography>
                <TextField 
                    name="title" 
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />

                <TextField 
                    name="description" 
                    variant="outlined"
                    label="Description"
                    fullWidth
                    value={postData.description}
                    onChange={(event) => setPostData({ ...postData, description: event.target.value })}
                />

                <TextField 
                    name="price" 
                    variant="outlined"
                    label="Price"
                    fullWidth
                    value={postData.price}
                    onChange={(event) => setPostData({ ...postData, price: event.target.value })}
                />

                <TextField 
                    name="brand" 
                    variant="outlined"
                    label="Brand"
                    fullWidth
                    value={postData.brand}
                    onChange={(event) => setPostData({ ...postData, brand: event.target.value })}
                />

                <TextField 
                    name="tags" 
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })}
                />

                <TextField 
                    name="category" 
                    variant="outlined"
                    label="Category"
                    fullWidth
                    value={postData.category}
                    onChange={(event) => setPostData({ ...postData, category: event.target.value })}
                />

                <TextField 
                    name="highlights" 
                    variant="outlined"
                    label="Product Highlights"
                    fullWidth
                    value={postData.highlights}
                    onChange={(event) => setPostData({ ...postData, highlights: event.target.value.split(',') })}
                />



                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple = {false}
                        onDone={({base64}) => setPostData({ ...postData, picture: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;