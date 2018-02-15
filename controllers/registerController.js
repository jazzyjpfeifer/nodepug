const User = require('../models/user');

const passport = require('passport');

//Sign Up
exports.register = function (req, res) {
    res.render('register/register', { title: 'Sign Up'});
};

exports.register_post = function (req, res) {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err) {
            console.log(err);
            return res.render('register/login');
        }
        passport.authenticate('local')(req, res, function() {
            console.log('Authenticating...');
            res.redirect('/');
        })
    })
};

//Login
exports.login = function (req, res) {
    res.render('register/login', { title: 'Login', message: req.flash('error')});
};

exports.login_post = function (req, res) {

};

//Logout
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};


