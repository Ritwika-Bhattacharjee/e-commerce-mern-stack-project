const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
        default: 0
    },
    contact: String,
    address: String,
    orderedOn: String,
    expectedDate: {
        type: String,
        default: 'Will be updated soon.'
    },
    status: {
        type: String,
        default: 'On the way'
    },
    payment: {
        type: String,
        default: 'Not Paid'
    },
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sellerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Order', orderSchema);