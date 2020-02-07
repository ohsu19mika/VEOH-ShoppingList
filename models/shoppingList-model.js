const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }]
});
const shoppingList_model = mongoose.model('shoppingList', user_schema);

module.exports = shoppingList_model;