const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewtext: String,
    name: String,
    stars: {
        type: Number,
        default: 0
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        default: ''
    },
    tags: [String],
    category: String,
    status: {
        type: String,
        default: 'In stock'
    },
    picture: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    highlights: [String],
    reviews: reviewSchema
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);