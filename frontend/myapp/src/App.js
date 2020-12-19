import React, { useState } from 'react';
import axios from 'axios';
//create client id from console.cloud.google.com

//importing components
import Login from './components/Login.js';
import Homepage from './components/Homepage.js';
import SellerHome from './components/SellerHome.js';

import image1 from './images/image1.JPG';
import image2 from './images/image2.JPG';
import image3 from './images/image3.JPG';
import image4 from './images/image4.JPG';
import image5 from './images/image5.JPG';
import image6 from './images/image6.JPG';

import { makeStyles } from '@material-ui/core';

import './styles.css'

function App() {

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

  const useStyles = makeStyles((theme) => ({
    navli: {
      color: 'black',
    listStyle:'none',
    display: 'inline-block',
    marginLeft: '0em',
    marginRight: '0em',
    fontSize: '1.5em',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '8px',
    borderRadius: '5px',
    width: '190px',
    textAlign: 'center',
    },
    
  }));

  const classes = useStyles();


  const [idtoken, setIdtoken] = useState(null);
  const [loggedinname, setloggedinname] = useState(null);
  const [type, setType] = useState("customer");
  const [loggedinUserType, setloggedinUserType] = useState(null);

  const setTokenOnSuccess = (userid, username, usertype) => {
    setIdtoken(userid);
    setloggedinname(username);
    setloggedinUserType(usertype);
  }

  const responsesuccessGoogle = (response) => {
      console.log(response);
      //const data =  {tokenId: response.tokenId};
      
        axios({
          method: "POST",
          url: "http://localhost:5000/auth/googlelogin",
          data: {tokenId: response.tokenId, type: type},
          
        }).then(res => {
          console.log("Google Login done Successfully!", res.data.user._id, res.data.user.name, res.data.user.type);
          setIdtoken(res.data.user._id);
          setloggedinname(res.data.user.name);
          setloggedinUserType(res.data.user.type);
        });
  }

  const responseerrorGoogle = (response) => {
      console.log("Login failure");
  }

  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/auth/facebooklogin",
      data: {accessToken: response.accessToken, userID: response.userID, type: type},
      
    }).then(res => {
      console.log("Facebook Login done Successfully!", res.data.user._id, res.data.user.name, res.data.user.type);
      setIdtoken(res.data.user._id);
      setloggedinname(res.data.user.name);
      setloggedinUserType(res.data.user.type);
    });
}

  const logout = () => {
    setIdtoken(null);
    setloggedinname(null);
    setloggedinUserType(null);

  }

  return (
    <div>

      {
        idtoken ? 
          loggedinUserType == "customer" ?
            (
              <Homepage username = {loggedinname} logout = {logout} userid = {idtoken} />
            ) : 
            (
              <SellerHome username = {loggedinname} userid = {idtoken} logout = {logout} />
            ) :
          (
            
            <div>
      <header id="headerbar" style={{height: '45em',
       background:'url(https://media.istockphoto.com/photos/know-ill-find-something-i-like-here-picture-id694044976?k=6&m=694044976&s=612x612&w=0&h=XPxsFIQ5pTVUMC60_BFA3u4v4o_pKmFV4AfBlf17d9U=)',
    backgroundSize:'100%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-10em'}}>
        <nav id="nav">
            <div style={{backgroundColor: 'black'}}>
            <img src="https://ebace.aero/wp-content/themes/EBACE2016/assets/hamburger.png" alt="dropdown"/>
            </div>
            <ul id="navul">
                <a href="#"><li className={classes.navli}>Home</li></a>
                <a href="#aboutid"><li className={classes.navli}>About</li></a>
                <a href="#contactid"><li className={classes.navli}>Contact</li></a>
                <a href="#registerid"><li className={classes.navli}>Sign In/Sign Up</li></a>

            </ul>
        </nav>
        <div className="hero-container">
            <h1>Shopaholic</h1>
            <h2>Welcome to Your Ultimate Shopping Destination</h2>
            <a href="#registerid"><button className="hero-getstarted">Get Started</button></a>
            <a href="#aboutid"><button className="hero-explore">Explore</button></a>
        </div>
    </header>

    <div id="registerid">
      
          <Login responsesuccessGoogle={responsesuccessGoogle} responseerrorGoogle={responseerrorGoogle} responseFacebook={responseFacebook} setTokenOnSuccess = {setTokenOnSuccess} setType = {setType} />
          
      </div>

        <div className="container" id="aboutid">
            <table width="80%" className="about-table">
            <tr>
                <th><img
                        src="https://www.netclipart.com/pp/m/232-2326912_girls-shopping-png-hd-transparent-girls-shopping-hd.png"
                        alt="description"
                        height="420" width="400" /></th>
                <th>
                    <h1>About Us</h1>
                    <p>
                      Shopaholic is a one stop shopping store for both sellers and buyers. Buy any products of your choice from various catergories such as men's and women's fashion, baby products, home decor materials and a lot more. Get doorstep deliveries in less than 15 days. And what more? Shopaholic also gives you a chance to sell yuor own merchandise. So what are you waiting for!!
                    </p>
                    <button className="button">Continue</button>
                </th>
            </tr>
            </table>
        </div>
        
<div className="portfolio-section">
    <h1 id="portfolio" align="center">Categories We Offer</h1>
          <table width="70%" className="service-table">
          <tr>

            <th><img src={image1} alt="portfolio" height="400" width="300" />
            <p id="caption">Men's Wear</p>
            </th>

            <th><img src={image2} alt="portfolio" height="400" width="300" />
            <p id="caption">Women's Wear</p>
            </th>

            <th><img src={image3} alt="portfolio" height="400" width="300" />
            <p id="caption">Home Decor and Furnitures</p>
			      </th>
          </tr>
          <tr>
            <th><img src={image4} alt="portfolio" height="400" width="300" />
            <p id="caption">Electronics</p>
			      </th>

            <th><img src={image5} alt="portfolio" height="400" width="300" />
            <p id="caption">Baby Products</p>
			      </th>

            <th><img src={image6} alt="portfolio" height="400" width="300" />
            <p id="caption">Sports, Fitness and Bags</p>
			      </th>

          </tr>
        </table>  
</div>

<div className="container contact-section" id="contactid">
    <h1 className="contact" align="center">Contact</h1>
<form>
    <div>
    <table width="100%">
    <tr>
    <td>
      <div>
        <label for="exampleEmailInput"><b>Your name</b></label><br />
        <input className="u-full-width" type="text" placeholder="Enter Name" id="exampleEmailInput" value={name} onChange={e => setName(e.target.value)} />
      </div>
    </td>

    <td>
      <div>
        <label for="exampleEmailInput"><b>Your email</b></label><br />
        <input className="u-full-width" type="email" placeholder="Enter Email" id="exampleEmailInput" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
    </td>
    </tr>
    </table>
    </div>

    <label for="exampleMessage"><b>Message</b></label><br />
    <textarea className="u-full-width" placeholder=" …" id="exampleMessage" value={message} onChange={e => setMessage(e.target.value)}></textarea><br />

    <input className="button" type="submit" value="SUBMIT" id="submitbutton" onClick = {sendMessage}/>
    <p style={{fontWeight: 'bold', color:'darkgreen'}}>{response}</p>

  </form>
</div>

   <footer id="footerid">
       &copy;2020 <br />
       made by <a href="https://www.linkedin.com/in/ritwika-bhattacharjee-930660172/" target="_blank">Ritwika</a>
   </footer> 

      </div>

          )
      }


      


    </div>
  )
}

export default App;
