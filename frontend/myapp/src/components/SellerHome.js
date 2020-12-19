import React, { useState, useEffect } from 'react';
import SellerOrders from './SellerOrders';
import SellerProducts from './SellerProducts';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import logoImage from '../images/logo.jpg';
import CustomerHome from './Customer/CustomerHome/CustomerHome.js';
import CustomerOrders from './Customer/CustomerOrders/CustomerOrders';
import CustomerProfile from './Customer/CustomerProfile/CustomerProfile.js';
import CustomerCart from './Customer/CustomerCart/CustomerCart.js';
import CustomerContact from './Customer/CustomerContact/CustomerContact.js';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {
    Toolbar,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link as MLink,
    MenuItem,
  } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const SellerHome = ({ username, userid, logout }) => {

    const useStyles = makeStyles((theme) => ({
        header: {
          //backgroundColor: "#400CCC",
          backgroundColor: '#0F053C',
          paddingRight: "30px",
          paddingLeft: "30px",
          "@media (max-width: 900px)": {
            paddingLeft: 0,
          },
        },
        logo: {
          fontFamily: "Work Sans, sans-serif",
          fontWeight: 600,
          color: "#FFFEFE",
          textAlign: "left",
        },
        menuButton: {
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 700,
          size: "18px",
          marginLeft: "38px",
        },
        toolbar: {
          display: "flex",
          justifyContent: "space-between",
        },
        drawerContainer: {
          padding: "20px 30px",
        },
        button : {
            color: 'white',
            //width: '80px',
        },
        appBar: {
            border: 'none',
            margin: '30px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          heading: {
            color: '#FFC300',
            fontSize: '4.5vw',
          },
          image: {
            borderRadius: '50%',
            marginRight: '10px',
          },
          [theme.breakpoints.down('sm')] : {
            mainContainer: {
              flexDirection: "column-reverse",
            },
          }
      }));

      const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
      const classes = useStyles();
      const [selectedButton, setSelectedButton] = useState("products");

        const [state, setState] = useState({
            mobileView: false,
            drawerOpen: false,
        });

        const { mobileView, drawerOpen } = state;

        useEffect(() => {
            const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
            };

            setResponsiveness();

            window.addEventListener("resize", () => setResponsiveness());
        }, []);

        const displayDesktop = () => {
            return (
              <Toolbar className={toolbar}>
                {ShopaholicLogo}
                <div style={{width: '85%'}}>{getMenuButtons()}</div>
                <button onClick={logout} style={{backgroundColor:'transparent', color:'white', border: 'none', cursor:'pointer'}}><PowerSettingsNewIcon /></button>
              </Toolbar>
            );
          };
        
          const displayMobile = () => {
            const handleDrawerOpen = () =>
              setState((prevState) => ({ ...prevState, drawerOpen: true }));
            const handleDrawerClose = () =>
              setState((prevState) => ({ ...prevState, drawerOpen: false }));
        
            return (
              <Toolbar>
                <IconButton
                  {...{
                    edge: "start",
                    color: "inherit",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerOpen,
                  }}
                >
                  <MenuIcon />
                </IconButton>
        
                <Drawer
                  {...{
                    anchor: "left",
                    open: drawerOpen,
                    onClose: handleDrawerClose,
                  }}
                >
                  <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
        
                <div>{ShopaholicLogo}</div>
                <button onClick={logout} style={{backgroundColor:'transparent', color:'white', border: 'none', cursor:'pointer', width:'40%'}}><PowerSettingsNewIcon /></button>
              </Toolbar>
            );
          };
        
          const getDrawerChoices = () => {
            
            return (
                <>
                <MenuItem>
                <Button style={{width: '100%'}}onClick = {e => setSelectedButton('products')}>My Products</Button>
                </MenuItem>
                <MenuItem>
                <Button onClick = {e => setSelectedButton('orders')}>My Orders</Button>                
                </MenuItem>
                </>
            )
          };
        
          const ShopaholicLogo = (
            
            <Container maxWidth="lg">
            <div className={classes.appBar} position="static" color="inherit">
                <img className={classes.image} src={logoImage} alt="logo" height="60"></img>
                <Typography className={classes.heading} align="center">Shopaholic</Typography>
            </div>
            </Container>
          );
        
          const getMenuButtons = () => {
            return (
                <>
                <Button className={classes.button} onClick = {e => setSelectedButton('products')}>My Products</Button>
                <Button className={classes.button} onClick = {e => setSelectedButton('orders')}>My Orders</Button>
                </>    
            )
          };

    return(

        <div>
            
            <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>

            <div style={{marginTop: '200px'}}>
                {
                    selectedButton == "orders" ?
                    (
                        <SellerOrders userid = {userid} />
                    ): (
                        <SellerProducts userid = {userid} />
                    )
                }
            </div>

        </div>

        
        
    )
}

{ /*<div>
    <h1>Seller Homepage</h1>
    <h3>Welcome {username}</h3>
    <div>
        <button onClick = {e => setSelectedButton('products')}>My Products</button>
        <button onClick = {e => setSelectedButton('orders')}>My Orders</button>
    </div>
    <div>
        {
            selectedButton == "orders" ?
            (
                <SellerOrders userid = {userid} />
            ): (
                <SellerProducts userid = {userid} />
            )
        }
    </div>
    <button onClick={logout}>Logout</button>

    </div> */}
export default SellerHome;