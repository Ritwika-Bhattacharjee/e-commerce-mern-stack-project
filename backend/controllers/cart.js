const User = require('../models/user.js');
const Product = require('../models/product.js');
const Item = require('../models/item.js');
const Cart = require('../models/cart.js');
const _ = require('lodash');
require('dotenv').config();

exports.add = async (req, res) => {
    const {userid, productid, quantity, cost} = req.body;

    //const newItem = new Item({item: productid, quantity: quantity});
    const newItem = {item: productid, quantity: quantity};
    let user;
    try {
        user = await User.findById({_id: userid})
        console.log('User found');
    } catch (error) {
        console.log('Error in finding User');
    } 

    let newCart = {};
    if(user.cart){
        console.log("Previous cart details found");
        /*user.cart.items.push(newItem);
        user.cart.totalItems = user.cart.totalItems+quantity;
        user.cart.totalCost = user.cart.totalCost+(quantity*cost);*/
        newCart = {items: [...user.cart.items, newItem], totalItems: parseInt(user.cart.totalItems)+parseInt(quantity), totalCost: user.cart.totalCost+(quantity*cost)};

    }else{
        console.log("No previous cart details found");
        newCart = {items: [newItem], totalItems: parseInt(quantity), totalCost: (quantity*cost)};
        /*user.cart.items.push(newItem);
        user.cart.totalItems = quantity;
        user.cart.totalCost = user.cart.totalCost+(quantity*cost);*/
        //user.cart = newCart;
    }
    console.log("Entering cart data");
    console.log(newCart);
    try {
        const newUser = await User.findByIdAndUpdate({_id: userid}, {cart: newCart}, {new: true});
        res.json(newUser);

    } catch (error) {
        console.log("Error in adding product to cart!!");
        res.status(404).json({error: error});
    }

}

exports.fetch = async (req, res) => {

    const userid = req.params.userid;

    try {
        const user = await User.findById({_id: userid});
        res.json(user.cart);

    } catch (error) {
        console.log("Error in fetching cart details!!");
        res.status(404).json({error: error});
    }
}

exports.increaseItem = async (req, res) => {

    const { userid, itemid, price } = req.body;

    let cart; 

    try {
        const user = await User.findById({_id: userid});
        cart = user.cart;
    } catch (error) {
        console.log("Error in fetching user details!!");
        res.status(404).json({error: error});
    }

    cart.totalItems = parseInt(cart.totalItems) + 1;
    cart.totalCost = parseInt(cart.totalCost) + parseInt(price);

    let newItems = [];

    cart.items.forEach((cartitem) => {
        if(cartitem.item == itemid){
            cartitem.quantity = parseInt(cartitem.quantity)+1;
        }
        newItems.push(cartitem);
    });

    cart.items = newItems;

    try {
        const newUser = await User.findByIdAndUpdate({_id: userid}, {cart: cart}, {new: true});
        res.json(newUser.cart);
    } catch (error) {
        console.log("Error in updating user cart details!!");
        res.status(404).json({error: error});
    }
}

exports.decreaseItem = async (req, res) => {
    const { userid, itemid, price } = req.body;

    let cart; 

    try {
        const user = await User.findById({_id: userid});
        cart = user.cart;
    } catch (error) {
        console.log("Error in fetching user details!!");
        res.status(404).json({error: error});
    }

    cart.totalItems = parseInt(cart.totalItems) - 1;
    cart.totalCost = parseInt(cart.totalCost) - parseInt(price);

    let newItems = [];

    cart.items.forEach((cartitem) => {
        if(cartitem.item == itemid && cartitem.quantity!=1){
            cartitem.quantity = parseInt(cartitem.quantity)-1;
            newItems.push(cartitem);
        }else if(cartitem.item != itemid){
            newItems.push(cartitem);
        }
    });

    cart.items = newItems;

    try {
        const newUser = await User.findByIdAndUpdate({_id: userid}, {cart: cart}, {new: true});
        res.json(newUser.cart);
    } catch (error) {
        console.log("Error in updating user cart details!!");
        res.status(404).json({error: error});
    }
}

exports.deleteItem = async (req, res) => {
    
    const { userid, itemid, price, quantity } = req.body;

    let cart; 

    try {
        const user = await User.findById({_id: userid});
        cart = user.cart;
    } catch (error) {
        console.log("Error in fetching user details!!");
        res.status(404).json({error: error});
    }

    cart.totalItems = parseInt(cart.totalItems) - parseInt(quantity);
    cart.totalCost = parseInt(cart.totalCost) - parseInt(price)*parseInt(quantity);

    let newItems = [];

    cart.items.forEach((cartitem) => {
        if(cartitem.item != itemid){
            newItems.push(cartitem);
        }
    });

    cart.items = newItems;

    try {
        const newUser = await User.findByIdAndUpdate({_id: userid}, {cart: cart}, {new: true});
        res.json(newUser.cart);
    } catch (error) {
        console.log("Error in updating user cart details!!");
        res.status(404).json({error: error});
    }
}

