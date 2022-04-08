const express = require('express');
const router = express.Router();
const passport = require('passport');

const Restaurant = require('../models/restaurant');
const User = require('../models/user');

router.get('/get-restaurant', (req, res, next) => {
    Restaurant.getAllRestaurant((err, restaurant) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            res.send({ success: true, restaurant: restaurant });
        }
    })
})

router.get('/get-restaurant/:id', (req, res, next) => {
    Restaurant.getRestaurantById(req.params.id, (err, restaurant) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            res.send({ success: true, restaurant: restaurant });
        }
    })
})

router.get('/get-restaurant-responsible/:id', (req, res, next) => {
    Restaurant.getRestaurantByResponsible(req.params.id, (err, restaurant) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            res.send({ success: true, restaurant: restaurant });
        }
    })
})

router.post('/add-restaurant', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    let newRestaurant = new Restaurant({
        name: req.body.name,
        location: req.body.location,
        responsible: req.body.responsible,
        meals: []
    })

    Restaurant.verifyRestaurant(newRestaurant.name, newRestaurant.location, (err, restaurant) => {
        if (restaurant) {
            res.send({ success: false, msg: "Restaurant already exist at the same location" });
        }

        Restaurant.addRestaurant(newRestaurant, (err, restaurant) => {
            if (err) {
                res.send({ success: false, msg: 'Failed to add restaurant' })
            } else {
                res.send({ success: true, msg: 'Restaurant created' })
            }
        })
    })
})

module.exports = router
