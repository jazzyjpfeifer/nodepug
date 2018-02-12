const Role = require('../models/roles');

exports.role_index = function (req, res) {
    Role.
    find({}).
    exec (function (err, listRoles) {
        if(err) {
            console.log(err)
        } else {
            res.render('roles/index', {title: 'Roles', roles:listRoles})
        }
    })
};

/*
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

 */