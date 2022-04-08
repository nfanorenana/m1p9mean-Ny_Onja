const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const Restaurant = module.exports = mongoose.model('Restaurant', RestaurantSchema);

module.exports.getAllRestaurant = function (callback) {
    Restaurant.find(callback);
}

module.exports.getRestaurantById = function (id, callback) {
    Restaurant.findById(id, callback);
}

module.exports.getRestaurantByName = function (name, callback) {
    const query = { name: name };
    Restaurant.find(query, callback);
}

module.exports.verifyRestaurant = function (name, location, callback) {
    Restaurant.findOne({ name: name, location: location }, callback);
}

module.exports.getRestaurantByLocation = function (location, callback) {
    const query = { location: location };
    Restaurant.find(query, callback);
}

module.exports.getRestaurantByResponsible = function (responsible, callback) {
    const query = { responsible: responsible };
    Restaurant.find(query, callback);
}

module.exports.addRestaurant = function (restaurant, callback) {
    restaurant.save(callback);
}

// module.exports.addMealToRestaurant = function (restaurantId, newMeal, callback) {
//     Restaurant.findOneAndUpdate({ _id: restaurantId }, { $push: { meals: newMeal._id } })

// }
