const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.config');
const nodemailer = require('../config/nodemailer.config');

const User = require('../models/user');
const { getUserRoute } = require('../helpers/helpers');


router.post('/register', (req, res, next) => {
    const token = jwt.sign({ email: req.body.email }, config.secret)

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmationCode: token,
        role: 'admin'
    });

    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
            return;
        }

        if (user) {
            res.json({ success: false, msg: 'Failed! Username is already in use!' });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.json({ success: false, msg: err });
                return
            }

            if (user) {
                res.json({ success: false, msg: 'Failed! Email is already in use!' });
                return;
            }

            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' })
                } else {
                    res.send({ success: true, msg: 'User registed' });
                    nodemailer.sendConfirmationEmail(user.username, user.email, user.confirmationCode);
                }
            })
        });
    });
});

router.get('/confirm/:confirmationCode', (req, res, next) => {
    User.verifyUser(req.params.confirmationCode, (err, user) => {

        if (!user) {
            return res.status(404).send({ sucess: false, msg: "User not found." });
        }

        User.updateUserStatus(user, (err, user) => {
            if (err) {
                res.status(500).send({ sucess: false, msg: err });
            } else {
                res.send({ success: true, msg: 'Account activated' });
            }
        })

    })
})

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (user.status != "Active") {
                return res.json({
                    success: false,
                    msg: "Pending Account. Please Verify Your Email!",
                });
            }

            if (isMatch) {
                const token = jwt.sign({ user }, config.secret, {
                    expiresIn: 256200 //3 days
                });

                const route = getUserRoute(user);

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    route: route,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

router.post('/create-user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const token = jwt.sign({ email: req.body.email }, config.secret)

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmationCode: token,
        role: req.body.role
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new user' })
        } else {
            res.send({ success: true, msg: 'User registed' });
            nodemailer.sendNewUserEmail(user.username, user.email, req.body.password, user.confirmationCode);
        }
    });
})

router.get('/list-user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var allUsers = [];

    User.getAllUser((err, users) => {
        if (err) {
            res.json({ sucess: false, msg: err });
        } else {
            users.forEach((user) => {
                allUsers.push({ id: user._id, name: user.name, email: user.email, username: user.username, role: user.role, status: user.status })
            });
            res.json({ sucess: true, msg: '', user: allUsers });
        }
    })
})

router.get('/list-user/:role', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var allUsers = [];

    User.getUserByRole(req.params.role, (err, users) => {
        if (err) {
            res.json({ sucess: false, msg: err });
        } else {
            users.forEach((user) => {
                allUsers.push({ id: user._id, name: user.name, email: user.email, username: user.username, role: user.role, status: user.status })
            });
            res.json({ sucess: true, msg: '', user: allUsers });
        }
    });
})

router.get('/order', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;
