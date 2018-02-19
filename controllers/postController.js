const Post = require('../models/posts'),
      Category = require('../models/category'),
      Author = require('../models/author'),
      Content_Type = require('../models/content_type');

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
            res.render('posts/index', { title: 'Posts', posts: posts});
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
            select('_id first_name last_name').
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

    //Validate Fields
    req.checkBody('title').notEmpty().withMessage('Title cannot by empty');
    req.checkBody('summary').notEmpty().withMessage('Summary cannot by empty');
    req.checkBody('category').notEmpty().withMessage('Category cannot by empty');
    req.checkBody('author').notEmpty().withMessage('Author cannot by empty');

    var errors = req.validationErrors();

    if(errors) {
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
                select('_id first_name last_name').
                exec(callback);
            },
        }, function (err, results) {
            if(err) {
                console.log(err)
            } else {
                res.render('posts/new', { title: 'New Post', categories: results.categories, authors: results.authors, errors: errors});
            }
        })

    } else {
        var title = req.sanitize(req.body.title).trim(),
            summary = req.sanitize(req.body.summary).trim(),
            category = req.sanitize(req.body.category).trim(),
            author = req.sanitize(req.body.author).trim(),
            newPost = {title: title, summary: summary, category: category, author: author};
        Post.create(newPost, function (err, post) {
            if(err){
                console.log(err);
            } else {
                req.flash('success', title + 'was added successfully as a post!');
                res.redirect('/posts');
            }
        })
    }
};

exports.post_show = function (req, res) {
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

    //Validate Fields
    req.checkBody('title').notEmpty().withMessage('Title cannot by empty');
    req.checkBody('summary').notEmpty().withMessage('Summary cannot by empty');
    req.checkBody('category').notEmpty().withMessage('Category cannot by empty');
    req.checkBody('author').notEmpty().withMessage('Author cannot by empty');
    req.checkBody('date_posted').notEmpty().withMessage('Date posted cannot by blank');

    var errors = req.validationErrors();

    if(errors){
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
                exec(callback);
            },
        }, function (err, results) {
            if(err) {
                console.log(err)
            } else {
                res.render('posts/edit', {title: 'Edit Post', post: results.post, categories: results.categories, authors: results.authors, errors: errors});
            }
        })
    } else {
        var title = req.sanitize(req.body.title).trim(),
            author = req.sanitize(req.body.author).trim(),
            category = req.sanitize(req.body.category).trim(),
            summary = req.sanitize(req.body.summary).trim(),
            date_posted = req.sanitize(req.body.date_posted).trim();
        Post.findByIdAndUpdate(req.params.id, {$set: {title:title, author: author, category:category, summary:summary, date_posted:date_posted }}, function (err, updatedPost) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Changes to the ' + title + ' post have been saved successfully to the database!');
                res.redirect('/posts');
            }
        })
    }

};

exports.post_delete = function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if(err) {
            console.log(err)
        } else {
            req.flash('success', 'The post has been removed from the database successfully!');
            res.redirect('/posts');
        }
    })
};

