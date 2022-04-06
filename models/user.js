const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    role:
    {
        type: String,
        enum: ["user", "admin", "delivery_man", "restaurant"]
    }

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.getAllUser = function (callback) {
    User.find(callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateUserStatus = function (user, callback) {
    user.status = "Active";
    user.save(callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.verifyUser = function (confirmationCode, callback) {
    User.findOne({ confirmationCode: confirmationCode, }, callback);
}

module.exports.getAllDeliveryAccount = function (callback) {
    const query = { role: 'delivery_man' };
    User.find(query, callback);
}

module.exports.getAllRestaurantAccount = function (callback) {
    const query = { role: 'restaurant' };
    User.find(query, callback);
}
