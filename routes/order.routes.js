const express = require('express');
const router = express.Router();
const passport = require('passport');


const Order = require('../models/order');
const Delivery = require('../models/delivery');

router.get('/get-order', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Delivery.getPendingDeliveryByDeliveryM(req.body.delivery_m_id, (err, delivery) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            res.send({ sucess: true, delivery: delivery });
        }
    })
});

router.get('/get-restaurant-order', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Order.getOrderByRestaurant(req.body.restaurant, (err, order) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            res.send({ success: true, order: order });
        }
    })
})

router.post('/add-order', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var total_price = 0;
    var mealOrdered = req.body.meals;

    mealOrdered.forEach(meal => {
        total_price += meal.price;
    });

    let newOrder = new Order({
        user_id: req.body.user_id,
        location: req.body.location,
        meals: req.body.meals,
        total_price: total_price,
    });

    Order.addOrder(newOrder, (err, order) => {
        if (err) {
            res.send({ success: false, msg: 'Failed to add order' })
        } else {
            res.send({ success: true, msg: 'Meal ordered' });
        }
    })
});

router.get('/deliver-order', passport.authenticaate('jwt', { session: false }), (req, res, next) => {
    Order.getOrderById(req.body.order_id, (err, order) => {
        if (err) {
            res.send({ success: false, msg: err });
        } else {
            Delivery.updateDeliveryStatus(order, (err, delivery) => {
                if (err) {
                    res.send({ success: false, msg: err });
                } else {
                    res.send({ success: true, msg: 'Order delivered' });
                }
            })
        }
    })
})

module.exports = router;
