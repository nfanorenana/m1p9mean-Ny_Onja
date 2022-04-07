const mongoose = require('mongoose');
const Delivery = require('./delivery');

const OrderSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: String,
    orderDate: Date,
    meals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal",
            quantity: Number,
            price: Number,
        }
    ],
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    total_price: Number,
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.addOrder = function (order, callback) {
    order.save(callback);
}

module.exports.getAllOrder = function (callback) {
    Order.find(callback);
}

module.exports.getAllOrderByUserId = function (id, callback) {
    const query = { user: id }
    Order.find(query, callback);
}

module.exports.getOrderById = function (id, callback) {
    Order.find(id, callback);
}

module.exports.getOrderByRestaurant = function (restaurant_id, callback) {
    const query = { restaurant: restaurant_id }
    Order.find(query, callback);
}
