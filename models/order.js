const mongoose = require('mongoose');
const Meal = require('./meal');

const OrderSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    meals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            quantity: Number
        }
    ]
});

const Order = module.exports = mongoose.model('Order', OrderSchema);
