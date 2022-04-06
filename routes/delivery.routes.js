const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/deliver', passport.authenticate('jwt', { session: false }), (req, res, next) => {

});

module.exports = router;
