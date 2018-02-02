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
        Post_Details.find({}).count().
            exec(callback)
        }
    }, function (err, results) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results.count);
            res.render('post_details/new', {title: 'Add Post Detail', post: results.post, content_types: results.content_types, count: results.count});
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

exports.post_detail_edit = function (req, res) {
    async.parallel({
        post_detail: function (callback) {
        Post_Detail.
            findById(req.params.id).
            populate('post').
            populate('content_type').
            exec(callback)
        },
        content_types: function (callback) {
            Content_Type.
            find({}).
            exec(callback)
        },
    },
        function (err, results) {
            if(err) {
                console.log(err);
            } else {
                res.render('post_details/edit', {title: 'Edit Post Detail', post_detail: results.post_detail, content_types: results.content_types});
            }
    })
};

exports.post_detail_update = function (req, res) {
        const post_id = req.body.post_id;
        Post_Detail.findByIdAndUpdate(req.params.id, req.body.post_detail, function(err, updatedPost_Detail) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(updatedPost_Detail);
            res.redirect('/posts/' + post_id + '/show');
        }
    })
};