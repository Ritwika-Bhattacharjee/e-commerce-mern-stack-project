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

module.exports = mongoose.model('Item', itemSchema);