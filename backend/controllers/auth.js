const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const _ = require('lodash');
require('dotenv').config();

//googleauth
const {OAuth2Client} = require('google-auth-library'); 

const fetch = require('node-fetch');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//mailgun
const mailgun = require('mailgun-js');
//const DOMAIN = 'something@mailgun.org';
//const mg = mailgun({apikey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

//google login controller function

exports.googlelogin = (req, res) => {
    const {tokenId, type} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID})
        .then((response) => {
            const {email_verified, name, email } = response.payload;
            console.log(response.payload);
            if(email_verified) {
                User.findOne({email}).exec((err, user) => {
                    if(err){
                        return res.status(400).json({error: "Something went wrong!"})
                    }else{
                        if(user) {
                            //user already in database
                            const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                            const {_id, name, email, type} = user;
                            res.json({
                                token,
                                user: {_id, name, email, type}
                            });
                        } else {
                            //user is new
                            //creating a new password
                            let password = email+process.env.JWT_SIGNIN_KEY;
                            let newUser = new User({ name, email, password, type});
                            newUser.save((err, data) => {
                                if(err){
                                    return res.status(400).json({
                                        error: 'Something went wrong!'
                                    });
                                }
                                const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                                const {_id, name, email, type} = newUser;
                                res.json({
                                    token,
                                    user: {_id, name, email, type}
                                });
                            });

                        }
                    }
                })
            }
        });
}

exports.facebooklogin = (req, res) => {

    const {userID, accessToken, type} = req.body;

    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    fetch(urlGraphFacebook, {
        method: 'GET'
    }).then(response => response.json())
    .then(response => {
        const { id, name } = response;
        const email = id;
        console.log(email);
        console.log(name);
        User.findOne({email}).exec((err, user) => {
            if(err) {
                return res.status(400).json({error: "Something went wrong"});
            }else{
                if(user) {
                    //user already in database
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                    const {_id, name, email, type} = user;
                    res.json({
                        token,
                        user: {_id, name, email, type}
                    });
                } else {
                    //user is new
                    //creating a new password
                    let password = email+process.env.JWT_SIGNIN_KEY;
                    let newUser = new User({ name, email, password, type });
                    newUser.save((err, data) => {
                        if(err){
                            console.log("Error in registration");
                            return res.status(400).json({
                                error: 'Something went wrong!'
                            });
                        }
                        const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                        const {_id, name, email, type} = newUser;
                        res.json({
                            token,
                            user: {_id, name, email, type}
                        });
                    });

                }
            }
        })
    })
}

exports.register = (req, res) => {
    const { name, email, password, type } = req.body;

    User.findOne({email}).exec((err, user) => {
        if(err){
            return res.status(400).json({error: "Something went wrong"});
        }else{
            if(user){
                res.json({
                    message: "User already exists. Please Login!"
                });
            }else{
                let newUser = new User({ name, email, password, type });
                newUser.save((err, data) => {
                    if(err){
                        console.log("Error in registration");
                        return res.status(400).json({
                            error: 'Something went wrong!'
                        });
                    }
                    const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                    const {_id, name, email, type} = data;
                    res.json({
                        token,
                        user: {_id, name, email, type},
                        message: "",
                    });

                });
            }
        }
    });
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({email}).exec((err, user) => {
        if(err){
            return res.status(400).json({error: "Something went wrong"});
        }else{
            if(user){
                if(password == user.password){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                    const {_id, name, email, type} = user;
                    res.json({
                        token,
                        user: {_id, name, email, type},
                        message: "",
                    });
                }else{
                    res.json({
                        message: "Incorrect Password! Please try again"
                    });
                }

            }else{
                res.json({
                    message: "User does not exist! Please Register first!"
                });
            }
        }
    });
}