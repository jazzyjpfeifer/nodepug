const Category = require('../models/category'),
    async = require('async');

exports.category_index = function (req, res) {
    Category.find({}, function(err, allCategories){
        if (err) {
            console.log(err);
        } else {
            res.render('categories/index', {title: 'Categories', categories: allCategories});
        }
    })

};

exports.category_new = function (req, res) {
    const count = Category.count({}, function(err, count) {
        if (err) {
            console.log(err);
        } else {
            {
                res.render('categories/new', {title: 'Add Category', count: count});
            }
        }
    })
};

exports.category_save = function (req, res) {

    //Validate Fields
    req.checkBody('description').notEmpty().withMessage('Category description cannot by empty');
    req.checkBody('sequence').notEmpty().withMessage('Sequence cannot by empty')
        .isInt().withMessage('Sequence must be a number');

    let errors = req.validationErrors();

    if(errors) {
        const count = Category.count({}, function(err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render('categories/new', {title: 'Add Category', count: count, errors: errors});
            }
        })

    } else {
        let desc = req.sanitize(req.body.description).trim(),
            seq = req.sanitize(req.body.sequence).trim(),
            newCategory = {description: desc, sequence: seq};
        Category.create(newCategory, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'The ' + desc + ' category was added successfully!');
                res.redirect('/categories');
            }
        })
    }
};

exports.category_edit = function (req, res) {
    Category.findById(req.params.id, function (err, foundCategory) {
        res.render('categories/edit', {title: 'Edit Category', category: foundCategory});
    })
};

exports.category_update = function (req, res) {

    //Validate Fields
    req.checkBody('description').notEmpty().withMessage('Category description cannot by empty');
    req.checkBody('sequence').notEmpty().withMessage('Sequence cannot by empty')
        .isInt().withMessage('Sequence must be a number');

    // Get Errors
    let errors = req.validationErrors();

    if(errors){
        Category.findById(req.params.id, function (err, foundCategory) {
            res.render('categories/edit', {title: 'Edit Category', category: foundCategory, errors: errors});
        })
    } else {
        let desc = req.sanitize(req.body.description).trim(),
            seq = req.sanitize(req.body.sequence).trim();
        Category.findByIdAndUpdate(req.params.id, { $set: { description: desc, sequence: seq }
        }, function (err, updatedCategory) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Changes to the ' + desc + ' category have been saved successfully to the database!');
                res.redirect('/categories');
            }
        })
    }
};

exports.category_delete = function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/categories");
        } else {
            req.flash('success', 'The category has been removed from the database successfully!');
            res.redirect("/categories");
        }
    })
};
