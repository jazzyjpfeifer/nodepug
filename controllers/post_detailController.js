const Post = require('../models/posts'),
      Post_Detail = require('../models/post_detail'),
      Content_Type = require('../models/content_type');

const express = require('express'),
      router = express.Router({mergeParams: true});

const async = require('async');

exports.post_detail_new = function (req, res) {
    async.parallel({
        post: function (callback) {
            Post.findById(req.params.id).
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
            res.render('post_details/new', {post: results.post, content_types: results.content_types, count: results.count});
        }
    })
};

exports.post_detail_save = function (req, res) {
    Post.findById(req.params.id, function(err, post){
        if(err) {
            console.log(err);
    } else {
            const content_type = req.body.content_type,
                  content = req.body.content,
                  sequence = req.body.sequence,
                  new_post_detail = {content_type: content_type, content: content, sequence: sequence};
            Post_Detail.create(new_post_detail, function (err, post_detail) {
                if (err) {
                    console.log(err)
                } else {
                    post_detail.save();
                    post.post_details.push(post_detail);
                    post.save();
                    console.log(post_detail);
                    res.redirect('/posts/' + post._id + '/show');
                }
            })
        }
    })
};