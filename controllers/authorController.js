const Author = require('../models/author');

exports.author_index = function (req, res) {
    Author.
        find({}).
        exec (function (err, listAuthors) {
        if(err) {
            console.log(err);
        } else {
            res.render('authors/index', {title: 'Authors', authors:listAuthors});
        }
    })
};

exports.author_new = function (req, res) {
    res.render('authors/new', {title: 'Add Author'});
};


exports.author_save = function (req, res) {

    //Validate Fields
    req.checkBody('first_name').notEmpty().withMessage('First name cannot by empty')
        .isAlphanumeric().withMessage('Full Name has non-alphanumeric characters.');
    req.checkBody('last_name').notEmpty().withMessage('Last name cannot by empty')
        .isAlphanumeric().withMessage('Full Name has non-alphanumeric characters.');
    req.checkBody('bio').notEmpty().withMessage('Bio cannot by empty');

    // Get Errors
    let errors = req.validationErrors();

    if(errors){
        res.render('authors/new', {title: 'Add Author', errors: errors});
    } else {
        let first_name = req.sanitize(req.body.first_name).trim(),
            last_name = req.sanitize(req.body.last_name).trim(),
            bio = req.sanitize(req.body.bio).trim(),
            newAuthor = {first_name: first_name, last_name: last_name, bio: bio};
        Author.create(newAuthor, function (err, newlyCreated) {
            if(err){
                console.log(err);
            } else {
                req.flash('success', newlyCreated.name + ' was successfully added as an author!');
                res.redirect('/authors');
            }
        })
    }
};

exports.author_show = function (req, res) {
    Author.findById(req.params.id).
    exec(function (err, foundAuthor) {
        if(err) {
            console.log(err)
        } else {
            res.render('authors/show', {title: 'Author Details', author: foundAuthor});
        }
    })
};

exports.author_edit = function (req, res) {
    Author.findById(req.params.id).
    exec(function (err, foundAuthor) {
        res.render('authors/edit', {title: 'Edit Author', author: foundAuthor});
    })
};

exports.author_update = function (req, res) {

    //Validate Fields
    req.checkBody('first_name').notEmpty().withMessage('First name cannot by empty');
    req.checkBody('last_name').notEmpty().withMessage('Last name cannot by empty');
    req.checkBody('bio').notEmpty().withMessage('Bio cannot by empty');

    // Get Errors
    let errors = req.validationErrors();

    if(errors){
        Author.findById(req.params.id).
        exec(function (err, foundAuthor) {
            res.render('authors/edit', {title: 'Edit Author', author: foundAuthor, errors: errors});
        })
    } else {
        let first_name = req.sanitize(req.body.first_name).trim(),
            last_name = req.sanitize(req.body.last_name).trim(),
            bio = req.sanitize(req.body.bio).trim();
        Author.findByIdAndUpdate(req.params.id, {$set: {first_name: first_name, last_name: last_name, bio: bio}}, function (err, updatedAuthor) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Changes to author ' + first_name + ' ' + last_name + ' have been saved successfully to the database!');
                res.redirect('/authors');
            }
        })
    }
};

exports.author_delete = function (req, res) {
        Author.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect('/authors');
            } else {
                req.flash('success', 'Author has been successfully removed from the database!');
                res.redirect('/authors');
            }
        })
};