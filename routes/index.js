const express = require('express');
const router = express.Router();
const passport = require("passport");
const middleware = require('../middleware');

// Require controller
const main_controller = require('../controllers/mainController');

router.get('/', main_controller.index);

router.get('/admin', middleware.isLoggedIn, main_controller.admin);

router.get('/login', main_controller.login);

router.get('/about', main_controller.about);

router.get('/contact', main_controller.contact);

router.post('/contact', main_controller.contact_send);

router.get('/more_stuff', main_controller.more);

router.get('/privacy', main_controller.privacy);


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), main_controller.login_post);

router.get('/logout', main_controller.logout);

router.get('/post/:id', main_controller.post);

module.exports = router;