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
    res.render('authors/new', {title: 'New Author'});
};

exports.author_save = function (req, res) {
    //getting data from form
    const name = req.body.name,
          bio = req.body.bio,
          newAuthor = {name: name, bio: bio};
    Author.create(newAuthor, function (err, newlyCreated) {
        if(err){
            console.log(err);
            res.redirect('/authors');
        } else {
            console.log(newlyCreated);
            res.redirect('/authors');
        }
    })
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
}

exports.author_update = function (req, res) {
    var name = req.body.name,
        bio = req.body.bio;
    Author.findByIdAndUpdate(req.params.id, {$set: {name: name, bio: bio}}, function (err, updatedAuthor) {
        if(err){
            console.log(err);
            res.redirect('/authors');
        } else {
            console.log('Records have been updated to the database: \n Name: ' + name + '\n bio: ' + bio);
            res.redirect('/authors');
        }
    })
};

exports.author_delete = function (req, res) {
        Author.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect('/authors');
            } else {
                console.log('The author has been removed from the database');
                res.redirect('/authors');
            }
        })
};