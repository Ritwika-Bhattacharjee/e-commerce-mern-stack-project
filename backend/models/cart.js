const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    totalItems: {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);