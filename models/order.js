const mongoose = require('mongoose');
const Meal = require('./meal');

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
    total_price: Number,
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.addOrder = function (order, callback) {
    // var mealOrderedLength = order.meals.length;
    // if (mealOrderedLength.length == 0) {
    // var meal = Meal.getMealByName({ name: order.meals[0].name });
    // if (meal.quantity < order.meals[0].quantity) {
    //     throw 'Insufficient quantity in stock'
    // }
    // var newQuantity = meal.quantity - order.meals[0].quantity;
    // Meal.updateMealQuantity(meal, newQuantity, (err) => {
    //     if (err) throw err;
    //     meal.save((err) => {
    //         if (err) throw err;
    order.save(callback);
    //     });
    // })
    // } else {
    // var meal = new Meal();

    // order.meals.forEach(mealOrder => {
    //     meal = Meal.getMealByName({ name: mealOrder.name });
    //     // if (meal.quantity < mealOrder.quantity) {
    //     //     throw 'Insufficient quantity in stock for ' + meal.name;
    //     // }

    //     var newQuantity = meal.quantity - mealOrder.quantity;

    //     Meal.updateMealQuantity(meal, newQuantity, (err, meal) => {
    //         if (err) throw err;
    //         meal.save((err) => {
    //             if (err) throw err;
    //         });
    //     });
    // });
    //     order.save(callback);
    // }
}

module.exports.getAllOrder = function (callback) {
    Order.find(callback);
}

module.exports.getAllOrderByUserId = function (id, callback) {
    const query = { user_id: id }
    Order.find(query, callback);
}
