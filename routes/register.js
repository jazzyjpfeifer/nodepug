const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require controller
const register_controller = require('../controllers/registerController');

router.get('/', register_controller.register);

router.post('/', register_controller.register_post);

router.get('/login', register_controller.login);

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/register/login'
    }),register_controller.login_post);

router.get('/logout', register_controller.logout);

module.exports = router;