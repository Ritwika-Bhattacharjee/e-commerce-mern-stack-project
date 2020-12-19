const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    totalItems: {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        default: 0
    }
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'customer'
    },
    address: String,
    phone: String,
    cart : cartSchema,
    orders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);