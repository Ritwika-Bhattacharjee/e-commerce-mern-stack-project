const User = require('../models/user.js');
const Product = require('../models/product.js');
const Order = require('../models/order.js');
const _ = require('lodash');
require('dotenv').config();

exports.placeOrder = (req, res) => {
    
    const order = req.body;
    order.orderedOn = Date().toString();
    let newOrder = new Order(order);
    newOrder.save((err, data) => {
        if(err){
            console.log("Error in placing order backend");
            return res.status(400).json({
                error: 'Something went wrong!'
            });
        }
        res.json(data);

    });
}

exports.getorders = async (req, res) => {

    const custid = req.params.userid;
    await Order.find({customerid: custid}, function(err, orders){
        if(err){
            console.log("Error in orders fetching");
            return res.status(400).json({
                error: 'Something went wrong!'
            });
        }
        res.json(orders);
    });
}

exports.getordersSeller = async (req, res) => {

    const custid = req.params.userid;
    await Order.find({sellerid: custid}, function(err, orders){
        if(err){
            console.log("Error in seller orders fetching");
            return res.status(400).json({
                error: 'Something went wrong!'
            });
        }
        res.json(orders);
    });
}

exports.editOrder = async (req, res) => {

    const { _id, payment, status, expectedDate } = req.body;

    /*let returnedOrder;
    try {
        returnedOrder = await Order.find({sellerid: sellerid});

    } catch (error) {
        console.log("order not found");
        res.status(404).json({message: error.message});
    }

    returnedOrder.payment = payment;
    returnedOrder.status = status;
    returnedOrder.expectedDate = expectedDate;*/

    try {
        const newOrder = await Order.findByIdAndUpdate({_id: _id}, {payment: payment, status: status, expectedDate: expectedDate}, {new:true});

        res.json(newOrder);
    } catch (error) {
        console.log("Order could not be updated");
        res.status(404).json({message: error.message});
    }
}