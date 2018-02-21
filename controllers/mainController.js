const Category = require('../models/category'),
    Post = require('../models/posts'),
    passport = require('passport');

const nodemailer = require('nodemailer');

const config = require('../config/config');

const async = require('async');

const moment = require('moment');

exports.index = function (req, res) {
    async .parallel({
        categories: function (callback) {
            Category.
            find({}).
            select('description').
            sort({sequence: 1}).
            exec(callback);
        },
        posts: function(callback) {
            Post.
            find({}).
            populate('author').
            sort({date_posted: -1}).
            exec(callback);
        },
        archives: function (callback) {
            Post.
            find({}).
            distinct('year_posted').
            exec(callback);
        },
    }, function (err, results) {
        if(err) {
            console.log(err)
        } else {
            res.render('index', { title: 'BI-Steps.com', categories: results.categories, posts: results.posts, archives: results.archives});
        }
    })
};

exports.admin = function (req, res) {
    res.render('admin', {title: 'Admin Page', messages: req.flash('error')});
};

//Contact
exports.contact = function (req, res) {
    res.render('contact', {title: 'Contact Us'})
};

exports.contact_send = function (req, res) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUser,
            pass: config.password
        }
    });

    let name = req.sanitize(req.body.name).trim(),
        email = req.sanitize(req.body.email).trim(),
        message = req.sanitize(req.body.message).trim(),
        mailOptions = {
            from: email,
            to: 'bisteps360@gmail.com',
            subject: 'From: ' + name,
            html: '<p>' + message + '</p>'
        };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return console.log(err)
        } else {
            console.log(mailOptions);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.redirect('/')
        }

    })
};


exports.more = function (req, res) {
    res.render('more_stuff', {title: 'More Stuff...'})
};

exports.privacy = function (req, res) {
    res.render('privacy_policy', {title: 'Privacy Policy'})
};

exports.post = function (req, res) {
    async.parallel({
        post: function(callback) {
            Post.
            findById(req.params.id).
            populate('author').
            populate({
                path: 'post_details',
                model: 'Post_Detail',
                populate: {
                    path: 'content_type',
                    model: 'Content_Type'
                }
            }).
            exec(callback)
        }
    }, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            res.render('post', {title: 'Post', post: results.post});
        }
    })
};

//About
exports.about = function (req, res) {
    res.render('about', {title: 'About Us'});
};

//Login
exports.login = function (req, res) {
    res.render('login', { title: 'Login', message: req.flash('error')});
};

exports.login_post = function (req, res) {

};

//Logout
exports.logout = function (req, res) {
    req.logout();
    req.flash('success', 'See you later');
    res.redirect('/');
};









