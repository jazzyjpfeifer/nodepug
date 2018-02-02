const Post = require('../models/posts'),
      Post_Detail = require('../models/post_detail'),
      Content_Type = require('../models/content_type');

const formidable = require('formidable'),
      path = require('path'),
      uploadDir = path.join(__dirname, '/..', '/public/', '/images/');

const express = require('express'),
      router = express.Router({mergeParams: true}),
      mongoose = require('mongoose');

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
        Post.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
            {$unwind: '$post_details'},
            {$group: {
                _id: '$_id', count: { $sum: 1}
                }}
        ]).
            exec(callback)
        }
    }, function (err, results) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('post_details/new', {title: 'Add Post Detail', post: results.post, content_types: results.content_types, count: results.count});
        }
    })
};

exports.post_detail_save = function (req, res) {
    const form = new formidable.IncomingForm();
    form.multiples = false;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;


    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var form_date = req.body.post_detail;
            console.log(form_date);
            Post_Detail.create(req.body.post_detail, function(err, post_detail){
                if(err){
                    console.log(err);
                } else {

                    //processing upload
                    form.parse(req, (err, fields, files) => {
                        if (err) return res.status(500).json({ error: err });
                    });
                    form.on('progress', function (bytesReceived, bytesExpected) {
                        const percent_complete = (bytesReceived / bytesExpected) * 100;
                        console.log('Percent ' + percent_complete.toFixed(2));
                    });
                    form.on('error', function (err) {
                        console.error(err);
                    });
                    form.on('fileBegin', function (name, file) {
                        const [fileName, fileExt] = file.name.split('.');
                        file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`);
                        console.log(file.name);
                    });


                   //saving comment
                    //post_detail.save();
                    //post.post_details.push(post_detail._id);
                    //post.save();
                    res.redirect('/posts/' + post.id + '/show');
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