const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    name_lower: String,
    production_cost: Number,
    selling_price: Number,
    published: {
        type: Boolean,
        default: true
    }
});

const Meal = module.exports = mongoose.model('Meal', MealSchema);


module.exports.getMealById = function (id, callback) {
    Meal.findById(id, callback);
}

module.exports.getMealByName = function (name, callback) {
    const query = { name_lower: name.toLowerCase() }
    Meal.findOne(query, callback);
}

module.exports.addMeal = function (newMeal, callback) {
    newMeal.save(callback);
}

module.exports.updateStatus = function (meal, callback) {
    meal.save(callback);
}
