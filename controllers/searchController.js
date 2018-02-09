const Category = require('../models/category'),
    Post = require('../models/posts');

const async = require('async');

exports.search = function (req, res) {
    const search = req.body.text_search;
    console.log(search);
    //res.render('search', {title: 'Search Results'});

     Post.find({$text: { $search: search}})
         .exec(function(err, search) {
             if(err) {
                 console.log(err);
                 res.redirect('/');
             } else {
                 console.log(search);
                 res.render('search', {title: 'Search Results', search: search});
             }
         })
};