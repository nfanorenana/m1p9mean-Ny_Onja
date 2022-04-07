const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const users = require('./routes/user.routes');
const meal = require('./routes/meal.routes');
const order = require('./routes/order.routes');
const restaurant = require('./routes/restaurant.routes');


// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected')
}, error => {
    console.log('Database could nto connected: ' + error)
})


// Setting up middleware
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.config')(passport);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', users);
app.use('/meal', meal);
app.use('/order', order);
app.use('/restaurant', restaurant);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Setting up the routes
app.get('/', (req, res) => {
    res.send('Invalid');
});


app.listen(port, () => {
    console.log('Connected to port ' + port)
});
