const Post = require('../models/posts'),
      Post_Detail = require('../models/post_detail'),
      Content_Type = require('../models/content_type');

const express = require('express'),
      router = express.Router({mergeParams: true});

const async = require('async');

exports.post_detail_new = function (req, res) {
    async.parallel({
        post: function (callback) {
            Post.
                findById(req.params.id).
                exec(callback)
        },
        content_types: function (callback) {
            Content_Type.
                find({}).
                exec(callback)
        },
        count: function (callback) {
            Post.
                findById(req.params.id).
                select('post_details -_id').
                //count().
            exec(callback)
        }
    }, function (err, results) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results.count);
            res.render('post_details/new', {post: results.post, content_types: results.content_types, count: results.count});
        }
    })
};

exports.post_detail_save = function (req, res) {
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else {
            Post_Detail.create(req.body.post_detail, function(err, post_detail){
                if(err){
                    //req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    console.log('Body Parser = ' + req.body.post_detail);
                    //save comment
                    post_detail.save();
                    post.post_details.push(post_detail._id);
                    post.save();
                    console.log(post_detail);
                    //req.flash("success", "Successfully added comment");
                    res.redirect('/posts/' + post._id + '/show');
                }
            });
        }
    });
};