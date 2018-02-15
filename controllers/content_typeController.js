const Content_Type = require('../models/content_type'),
    async = require('async');

exports.content_types_index = function (req, res) {
    Content_Type.find({}, function (err, allContent_Types) {
        if(err){
            console.log(err);
        } else {
            res.render('content_types/index', {title: 'Content Types', content_types:allContent_Types});
        }
    })
};

exports.content_types_new = function (req, res) {
    const count = Content_Type.count({}, function (err, count) {
        if(err) {
            console.log(err);
        } else {
            res.render('content_types/new', {title: 'Add Content Types', count: count});
        }
    })
};

exports.content_types_save = function (req, res) {

    //Validate Fields
    req.checkBody('description').notEmpty().withMessage('Category description cannot by empty');
    req.checkBody('sequence').notEmpty().withMessage('Sequence cannot by empty')
        .isInt().withMessage('Sequence must be a number');

    let errors = req.validationErrors();

    //Check for errors and re-render page
    if(errors) {
        const count = Content_Type.count({}, function(err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render('content_types/new', {title: 'Add Content Types', count: count, errors: errors});
            }
        })

    } else {
        let desc = req.sanitize(req.body.description).trim(),
            seq = req.sanitize(req.body.sequence).trim(),
            newContentType = {description: desc, sequence: seq};
        Content_Type.create(newContentType, function (err, results) {
            if (err) {
                console.log(err)
            } else {
                req.flash('success', 'The ' + desc + ' content type was added successfully!');
                res.redirect('/content_types');
            }
        })
    }
};

exports.content_types_edit = function (req, res) {
    Content_Type.findById(req.params.id, function (err, foundContentTypes) {
        res.render('content_types/edit', {title: 'Edit Content Types', content_type:foundContentTypes});
    })
};

exports.content_types_update = function (req, res) {

    //Validate Fields
    req.checkBody('description').notEmpty().withMessage('Category description cannot by empty');
    req.checkBody('sequence').notEmpty().withMessage('Sequence cannot by empty')
        .isInt().withMessage('Sequence must be a number');

    // Get Errors
    let errors = req.validationErrors();

    if(errors){
        Content_Type.findById(req.params.id, function (err, foundContentTypes) {
            res.render('content_types/edit', {title: 'Edit Category Types', content_type:foundContentTypes, errors: errors});
        })
    } else {
        let desc = req.body.description,
            seq = req.body.sequence;
        Content_Type.findByIdAndUpdate(req.params.id, {$set: {description: desc, sequence: seq}}, function (err, updatedContentType) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Changes to the ' + desc + ' content type have been saved to the database successfully!');
                res.redirect('/content_types');
            }
        })
    }
};

exports.content_types_delete = function (req, res) {
    Content_Type.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect('/content_types');
        } else {
            req.flash('success', 'The content type has been removed from the database successfully!');
            res.redirect('/content_types');
        }
    })
};

