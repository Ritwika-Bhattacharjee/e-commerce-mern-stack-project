import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const SearchBar = ({ setProducts }) => {

    const [searchOptions, setSearchOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);

    const handleSubmit = () => {
        console.log("Searched term is: ", searchTerm);
        axios({
            method: "GET",
            url: "http://localhost:5000/customer/getsearchedproducts/"+searchTerm,            
          }).then(res => {
              console.log(res.data);
              setProducts(res.data);
          });
    }
    
    const fetchSearchOptions = () => {
        console.log("frontend search function called");
        axios({
            method: "GET",
            url: "http://localhost:5000/customer/getsearchoptions/",            
          }).then(res => {
              console.log(res.data);
              setSearchOptions(res.data);
          });
    }
    
    useEffect(() => {
        console.log("Demo function called");
        fetchSearchOptions();
      }, []);

    return (
        <div style={{ width: '100%', alignItems: 'center', display: 'flex'}}>
      <Autocomplete
        style = {{width: "90%"}}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchOptions}
        onChange = {(e, values) => {setSearchTerm(values)}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for products"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
            value = {searchTerm}
            onChange = {e => setSearchTerm(e.target.value)}
          />
        )}
      />
      <button
        onClick = {handleSubmit} 
        style={{backgroundColor: "#FFC300", border: "none", borderRadius: '10%', height: '56px', width:'50px'}}>
        <SearchIcon />
      </button>
    </div>
    )
}

export default SearchBar;