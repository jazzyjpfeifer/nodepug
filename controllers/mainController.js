const Category = require('../models/category'),
      Post = require('../models/posts'),
      passport = require('passport');

const async = require('async');

const moment = require('moment');

exports.index = function (req, res) {
    async .parallel({
        categories: function (callback) {
            Category.
            find({}).
            select('description -_id').
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
            Post.aggregate([
                { "$group": {
                        _id: { year: { $year: '$date_posted'}, month: {$month: '$date_posted'}},
                        year: { '$addToSet': { $year: '$date_posted'}},
                    }}
            ]).
            exec(callback);
        },
    }, function (err, results) {
        if(err) {
            console.log(err)
        } else {
            console.log(req.user);
            res.render('index', { title: 'BI-Steps.com', categories: results.categories, posts: results.posts, archives: results.archives, currentUser: req.user});
        }
    })
};

exports.admin = function (req, res) {
    res.render('admin', {title: 'Admin Page'});
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






