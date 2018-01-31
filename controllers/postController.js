const Post = require('../models/posts'),
      Category = require('../models/category'),
      Author = require('../models/author'),
      Content_Type = require('../models/content_type');
      Post_Details = require('../models/post_detail');

const async = require('async');

exports.post_list = function (req, res) {
    Post.
    find({}).
    populate('category').
    populate('author').
    exec (function (err, posts) {
        if(err){
            console.log(err);
        } else {
            res.render('posts/index', { title: 'Posts', posts:posts });
        }
    })
};

exports.post_new = function (req, res) {
    async.parallel({
        categories: function (callback) {
            Category.
            find({}).
            populate('category').
            populate('author').
            select('_id description').
            sort({sequence: 1}).
            exec(callback);
        },
        authors: function (callback) {
            Author.
            find({}).
            select('_id name').
            exec(callback);
        },
    }, function (err, results) {
        if(err) {
            console.log(err)
        } else {
            res.render('posts/new', { title: 'New Post', categories: results.categories, authors: results.authors});
        }
    })
};

exports.post_save = function (req, res) {
    //getting data from form
    const title = req.body.title,
          summary = req.body.summary,
          category = req.body.category,
          author = req.body.author,
          newPost = {title: title, summary: summary, category: category, author: author};
    Post.create(newPost, function (err, post) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/posts');
        }
    })
};

exports.post_show = function (req, res) {
    async.parallel({
        post: function(callback) {
            Post.
            findById(req.params.id).
            populate('author').
            populate({
                path: 'post_details',
                mode: 'Post_Detail',
                    populate: {
                        path: 'content_type',
                        model: 'Content_Type'
                        }
                    }).
                exec(callback)
        },
    }, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            res.render('posts/show', {title: 'New Post', post: results.post});
        }
    })
};

exports.post_edit = function (req, res) {
    async.parallel({
        post: function (callback) {
            Post.
            findById(req.params.id).
            populate('category').
            populate('author').
            exec(callback)
        },
        categories: function (callback) {
            Category.
            find({}).
            select('_id description').
            sort({sequence: 1}).
            exec(callback);
        },
        authors: function (callback) {
            Author.
            find({}).
            select('_id name').
            exec(callback);
        },
    }, function (err, results) {
        if(err) {
            console.log(err)
        } else {
            res.render('posts/edit', {title: 'Edit Post', post: results.post, categories: results.categories, authors: results.authors});
        }
    })
};

exports.post_update = function (req, res) {
    const title = req.body.title,
          author = req.body.author,
          category = req.body.category,
          summary = req.body.summary,
          date_posted = req.body.date_posted;
    Post.findByIdAndUpdate(req.params.id, {$set: {title:title, author: author, category:category, summary:summary, date_posted:date_posted }}, function (err, updatedPost) {
        if (err) {
            console.log(err);
        } else {
            console.log(updatedPost);
            res.redirect('/posts');
        }
    })
};

exports.post_delete = function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if(err) {
            console.log(err)
        } else {
            console.log('Record was deleted from the database successfully');
            res.redirect('/posts');
        }
    })
};

