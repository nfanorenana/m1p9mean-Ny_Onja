const express = require('express');
const router = express.Router();

const Meal = require('../models/meal');

router.post('/add-meal', (req, res, next) => {
    let newMeal = new Meal({ name: req.body.name, price: req.body.price });

    Meal.findOne({
        name: req.body.name
    }).exec((err, meal) => {
        if (err) {
            res.json({ success: false, msg: err });
            return;
        }

        if (meal) {
            res.json({ success: false, msg: 'Name already in use!' });
            return;
        }

        Meal.addMeal(newMeal, (err, user) => {
            if (err) {
                res.json({ success: false, msg: err });
            } else {
                res.send({ success: true, msg: 'Meal added' });
            }
        })

    })
})

router.get('/:name', (req, res, next) => {
    const mealName = req.params.name;

    Meal.getMealByName(mealName, (err, meal) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({
                success: true, meal: {
                    id: meal._id,
                    name: meal.name,
                    price: meal.price
                }
            });
        }
    });
})

module.exports = router;
