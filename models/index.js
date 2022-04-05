const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user');

db.ROLES = ['user', 'admin', 'delivery_man', 'restaurant'];

module.exports = db;
