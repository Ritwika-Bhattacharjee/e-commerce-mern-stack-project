const User = require('../models/user.js');
const Product = require('../models/product.js');
const _ = require('lodash');
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();

exports.getcategoryitems = async (req, res) => {
    const category = req.params.category;

    await Product.find({category: category}, function(err, products){
        if(err){
            console.log("Error in products fetching");
            return res.status(400).json({
                error: 'Something went wrong!'
            }); 
        }
        res.json(products);
    });
}

exports.getsearchoptions = async (req, res) => {

    let options = [];
    let foundProducts = [];

    try{
        foundProducts = await Product.find({});

    }catch(error){
        console.log("Error in products fetching!!");
        return res.status(400).json({
            error: 'Something went wrong!'
        }); 
    }

    foundProducts.forEach((product) => {
        console.log(product.title);
        console.log(product.tags);
        console.log(product.description);
        options.push(product.title);
        options.push(product.description);
        product.tags.forEach(tag => options.push(tag));
    });

    res.json(options);

}

exports.getsearchedproducts = async (req, res) => {

    const searchTerm = req.params.searchTerm;
    let foundProducts = [];
    let products = [];

    try{
        foundProducts = await Product.find({});

    }catch(error){
        console.log("Error in products fetching!!");
        return res.status(400).json({
            error: 'Something went wrong!'
        }); 
    }

    foundProducts.forEach((product) => {
        found = 0;
        if(product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())){
            found = 1;
        }
        product.tags.forEach((tag) => {
            if(tag.toLowerCase().includes(searchTerm.toLowerCase())){
                found = 1;
            }
        })
        if(found == 1){
            products.push(product);
        }
    });

    res.json(products);
}

exports.getprofile = async (req, res) => {

    const userid = req.params.userid;

    try{
        const foundUser = await User.findById({_id:userid});

        res.json(foundUser);

    }catch(error){
        console.log("Error in fetching user profile!!");
        return res.status(400).json({
            error: 'Something went wrong!'
        }); 
    }
}

exports.editprofile = async (req, res) => {

    const {name, phone, address, _id} = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {name: name, phone: phone, address: address}, {new:true});

        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.sendMessage = (req, res) => {

    const contactEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    
    contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
    });

    const { name, email, message } = req.body;
    const mail = {
        from: name,
        to: process.env.GMAIL_USERNAME,
        subject: "Shopaholic Customer Message",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ error: "failed" });
        } else {
            res.json({ status: "sent" });
        }
    });
}