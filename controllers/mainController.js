const Category = require('../models/category');

exports.index = function (req, res) {
    Category.
        find({}).
        select('description -_id').
        sort({sequence: 1}).
        exec(function (err, categoryDescriptions) {
            if (err) {
                console.log(err)
            } else {
                res.render('index', {title: 'BI-Steps.com', categories: categoryDescriptions});
            }
    })
};

exports.admin = function (req, res) {
    res.render('admin', { title: 'Admin' });

};