import React , { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';
import { CircularProgress } from '@material-ui/core';

const CustomerProfile = ({ userid }) => {

    const [profileData, setProfileData] = useState(null);
    const [editOption, setEditOption] = useState(null);

    const fetchProfile = () => {
        console.log("fetch profile function called");
        axios({
            method: "GET",
            url: "http://localhost:5000/customer/getprofile/"+userid,            
          }).then(res => {
              console.log(res.data);
              setProfileData(res.data);
          });
    }

    useEffect(() => {
        console.log("Use effect called");
        fetchProfile();
      }, []);

    return (
        <div style={{marginTop: '200px'}}>
            {
                !editOption && profileData
                 ? (
                    <DisplayProfile profileData={profileData} setEditOption={setEditOption}/>
                ): profileData ?
                (
                    <EditProfile profileData={profileData} setEditOption={setEditOption} userid={userid} fetchProfile={fetchProfile}/>
                ):
                <CircularProgress />
            }
        </div>
    )
}

export default CustomerProfile;