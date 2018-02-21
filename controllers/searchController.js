const Post = require('../models/posts');

const async = require('async');

exports.search = function (req, res) {
    let search = req.body.text_search;
    async.parallel({
        search: function (callback) {
            Post.find({$text: {$search: search}}).
            exec(callback)
        },
        count: function (callback) {
            Post.count({$text: {$search: search}}).
            exec(callback)
        }
    }, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            console.log(results.count);
            res.render('search', {title: 'Search Results', search: results.search, count: results.count});
        }
    })
};

exports.search_year = function (req, res) {
    const search = req.params.year;
    async.parallel({
        search: function (callback) {
            Post.
            find({year_posted: search}).
            exec(callback)
        },
        count: function (callback) {
            Post.
            count({year_posted: search}).
            exec(callback)
        }
    }, function (err, results) {
            if (err) {
                console.log(err)
            } else {
                res.render('search', {title: 'Search Results', search: results.search, count: results.count})
            }
        }
    )
};

exports.search_category = function (req, res) {
    const category = req.params.category;
    console.log(category);
    async.parallel({
        search: function (callback) {
            Post.find({category: category}).
            exec(callback)
        },
        count: function (callback) {
            Post.count({category: category}).
            exec(callback)
        }
    }, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            res.render('search', {title: 'Search Results', search: results.search, count: results.count})
        }
    })
};


