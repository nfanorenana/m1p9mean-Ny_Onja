const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
    name: String,
    price: Number,
});

const Meal = module.exports = mongoose.model('Meal', MealSchema);

module.exports.getMealById = function (id, callback) {
    Meal.findById(id, callback);
}

module.exports.getMealByName = function (name, callback) {
    const query = { name: name }
    Meal.findOne(query, callback);
}

module.exports.addMeal = function (newMeal, callback) {
    newMeal.save(callback);
}
