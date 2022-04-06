const express = require('express');
const router = express.Router();

const Meal = require('../models/meal');

router.post('/add-meal', (req, res, next) => {
    let newMeal = new Meal({ name: req.body.name, name_lower: req.body.name.toLowerCase(), price: req.body.price, quantity: req.body.quantity });

    Meal.findOne({
        name: req.body.name
    }).exec((err, meal) => {
        if (err) {
            res.json({ success: false, msg: err });
            return;
        }

        if (meal) {
            res.json({ success: false, msg: 'Failed! Name is already in use!' });
            return;
        } else {
            Meal.addMeal(newMeal, (err, meal) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.send({ success: true, msg: 'Meal added' });
                }
            })
        }
    })
})

router.get('/get-meal/:name', (req, res, next) => {
    const mealName = req.params.name;

    Meal.getMealByName(mealName, (err, meal) => {
        if (!meal) {
            res.json({ success: false, msg: "Meal not found" });
        } else {
            res.json({
                success: true, meal: {
                    id: meal._id,
                    name: meal.name,
                    name_lower: meal.name_lower,
                    price: meal.price,
                    quantity: meal.quantity
                }
            });
        }
    });
})

module.exports = router;
