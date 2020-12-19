const User = require('../models/user.js');
const Product = require('../models/product.js');
const _ = require('lodash');
require('dotenv').config();

exports.createproduct = (req, res) => {
    
    const {title, description, price, brand, tags, category, picture, highlights, userid} = req.body;
    console.log("Seller id backend: ", userid);
    let newProduct = new Product({title, description, price, brand, tags, category, picture, highlights, userid});
    newProduct.save((err, data) => {
        if(err){
            console.log("Error in product creation");
            return res.status(400).json({
                error: 'Something went wrong!'
            });
        }
        const {_id} = data;
        res.json({
            _id,
            error: "",
        });

    });
}

exports.getproducts = async (req, res) => {

    const { userid } = req.body;

    await Product.find({userid: userid}, function(err, products){
        if(err){
            console.log("Error in product fetching");
            return res.status(400).json({
                error: 'Something went wrong!'
            });
        }
        res.json(products);
    });
}

exports.getoneproduct = async (req, res) => {

    const productid = req.params.id;

    await Product.findOne({_id: productid}, function(err, product){
        if(err){
            console.log("Error in product fetching");
            return res.status(400).json({
                error: 'Something went wrong!'
            }); 
        }
        res.json(product);
    });
}

exports.updateproduct = async (req, res) => {

    const { _id } = req.body;
    const updatedProduct = req.body;

    try {
        const returnedProduct = await Product.findByIdAndUpdate(_id, updatedProduct, {new:true});

        res.json(returnedProduct);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.deleteproduct = async (req, res) => {

    const { _id } = req.body;
    try {

        await Product.findByIdAndRemove(_id);

        res.json({ message: 'Product deleted successfully!!'});
    } catch (error) {
        res.status(404).json({message: error.message});
    } 
}