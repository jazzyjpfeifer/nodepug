const Post = require('../models/posts'),
      Post_Detail = require('../models/post_detail'),
      Content_Type = require('../models/content_type');

const async = require('async');

exports.post_detail_new = function (req, res) {
    async.parallel({
        post: function (callback) {
            Post.findById(req.params.id).
            exec(callback)
        },
        post_detail: function(callback) {
            Post_Detail.
            create(req.body.content).
            exec(callback)
        },
        content_types: function (callback) {
            Content_Type.
            find({}).
            exec(callback)
        },
        count: function (callback) {
            Post_Detail.
            count({}).
            exec(callback)
        }
    }, function (err, results) {
        if(err) {
            console.log(err);
        }
        else {
            console.log('************' + results.post);
            res.render('post_details/new', {post: results.post, content_types: results.content_types, count: results.count});
        }
    })
};

exports.post_detail_save = function (req, res) {
    async.parallel({
        posts: function (callback) {
            Post.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/posts/'+ Post.findById(req.params.id) + '/show', {post: results.post});
        }
    });
};
