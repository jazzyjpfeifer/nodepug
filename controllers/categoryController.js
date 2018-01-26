const Category = require('../models/category'),
    async = require('async');

exports.category_index = function (req, res) {
    Category.find({}, function(err, allCategories){
        if(err){
            console.log(err);
        } else {
            res.render('categories/index', {title: 'Categories', categories:allCategories});
        }
    })

};

exports.category_new = function (req, res) {
    const count = Category.count({}, function(err, count) {
        if (err) {
            console.log(err);
        } else {
            {
                res.render('categories/new', {title: 'Add Category', count:count});
            }
        }
    })
};

exports.category_save = function (req, res) {
    const desc = req.body.description;
    const seq = req.body.sequence;
    const newCategory = {description: desc, sequence: seq};
    Category.create(newCategory, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.redirect('/categories');
        }
    })
};


exports.category_edit = function (req, res) {
    Category.findById(req.params.id, function (err, foundCategory) {
        res.render('categories/edit', {title: 'Edit Category', category: foundCategory});
    })
};

exports.category_update = function (req, res) {
    const desc = req.body.description;
    const seq = req.body.sequence;
    Category.findByIdAndUpdate(req.params.id, {$set: {description: desc, sequence: seq}}, function (err, updatedCategory) {
        if(err){
            console.log(err);
            res.redirect('/categories');
        } else {
            console.log('Records have been updated to the database: \n Description: ' + desc + '\n Sequence: ' + seq);
            res.redirect('/categories');
        }
    })
};

exports.category_delete = function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/categories");
        } else {
            res.redirect("/categories");
        }
    })
};
