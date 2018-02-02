const Category = require('../models/category');

const formidable = require('formidable');
const path = require('path');
const uploadDir = path.join(__dirname, '/..', '/public/', '/images/');


//C:\Sites\React\myapp1.2\public\images


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

exports.upload = function (req, res) {
    res.render('upload', {title: 'Upload Test'});
};

exports.process = function (req, res) {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({ error: err });
        res.redirect('/');
    });

    form.on('progress', function (bytesReceived, bytesExpected) {
        const percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log('Percent ' + percent_complete.toFixed(2));
    });

    form.on('error', function (err) {
        console.error(err);
    });

    form.on('fileBegin', function (name, file) {
        const [fileName, fileExt] = file.name.split('.');
        file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`);
        console.log(file.name);
    });

};