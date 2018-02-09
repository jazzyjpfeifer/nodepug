const Post = require('../models/posts'),
      Post_Detail = require('../models/post_detail'),
      Content_Type = require('../models/content_type');

const express = require('express'),
      mongoose = require('mongoose');

const async = require('async');

//file upload
const multer = require('multer');
const path = require('path');

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
            console.log(JSON.stringify(results.count));
        }
    })
};

exports.post_detail_save = function (req, res) {
    const uploadDir = path.join(__dirname, '/..', '/public/', '/images/');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png|gif/;
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (extname) {
                return cb(null, true);
            }
            cb('Error: File upload only supports the following file types: ' + filetypes);
        },
        limits: {
            fileSize: 4000000 //4 MB
        }
    }).single('file_name');
    //Get Post related to Post_Details
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
        } else {
            upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    const post_id = req.body.post,
                        post_title = req.body.post_title,
                        content_type = req.body.content_type,
                        content = req.body.content,
                        sequence = req.body.sequence;
                    const file = req.file;
                    // if file upload is blank
                    if (file == null) {
                        newPost_Detail = {
                            post_id: post_id,
                            post_title: post_title,
                            content_type: content_type,
                            content: content,
                            sequence: sequence
                        };
                    } else {
                        const file_name = req.file.filename;
                        newPost_Detail = {
                            post_id: post_id,
                            post_title: post_title,
                            content_type: content_type,
                            content: content,
                            sequence: sequence,
                            file_name: file_name
                        };
                    }
                    //saving post detail
                    Post_Detail.create(newPost_Detail, function (err, post_detail) {
                    if (err) {
                        console.log(err);
                    } else {
                            //saving post_detail
                            post_detail.save();
                            post.post_details.push(post_detail._id);
                            post.save();
                            res.redirect('/posts/' + post.id + '/show');
                        }
                    });
                }
            });
        }
    })
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

exports.post_detail_delete = function (req, res) {
    const post_id = req.body.post_id;
    async.waterfall([
        function(callback) {
            //removing Post_Detail from Post_Detail
            Post_Detail.findByIdAndRemove(req.params.id, function (err, post_detail) {
                console.log('delete Post Details from Post');
                if (err) {
                    console.log(err)
                } else {
                    console.log('Record was deleted from the database successfully');
                    callback(null, post_detail);
                }
            })
        },
        function (post, callback) {
        Post.update({'post_details': req.params.id}, {$pull:{'post_details': req.params.id}})
            .exec(function (err, res) {
                if(err) {
                    console.log(err)
                }
                else {
                    console.log(req.params.id);
                    callback(null, post);
                }
            })
        },
    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            return result
        }
    });
        res.redirect('/posts/'+ post_id +'/show');
};