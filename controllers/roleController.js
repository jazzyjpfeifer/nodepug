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


exports.role_new = function (req, res) {
    res.render('roles/new', {title: 'New Role'});
};

exports.role_save = function (req, res) {
    //getting data from form
    const description = req.body.description,
        newrole = {description: description};
    console.log(description);
    Role.create(newrole, function (err, newlyCreated) {
        if(err){
            console.log(err);
            res.redirect('/roles');
        } else {
            console.log(newlyCreated);
            res.redirect('/roles');
        }
    })
};

exports.role_show = function (req, res) {
    Role.findById(req.params.id).
    exec(function (err, foundrole) {
        if(err) {
            console.log(err)
        } else {
            res.render('roles/show', {title: 'role Details', role: foundrole});
        }
    })
};

exports.role_edit = function (req, res) {
    Role.findById(req.params.id).
    exec(function (err, foundrole) {
        res.render('roles/edit', {title: 'Edit role', role: foundrole});
    })
};

exports.role_update = function (req, res) {
    const description = req.body.description;
    Role.findByIdAndUpdate(req.params.id, {$set: {description: description}}, function (err, updatedrole) {
        if(err){
            console.log(err);
            res.redirect('/roles');
        } else {
            console.log('Records have been updated to the database: \n Name: ' + description );
            res.redirect('/roles');
        }
    })
};

exports.role_delete = function (req, res) {
    Role.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/roles');
        } else {
            console.log('The role has been removed from the database');
            res.redirect('/roles');
        }
    })
};