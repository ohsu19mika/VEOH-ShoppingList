const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const product_model = mongoose.model('product', user_schema);

module.exports = product_model;