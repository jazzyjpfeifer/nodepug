const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      methodOverride = require('method-override'),
      morgan = require('morgan');

//require models
const Author = require('./models/author'),
      Category = require('./models/category'),
      Content_Type = require('./models/content_type'),
      Post_Detail = require('./models/post_detail'),
      Post = require('./models/posts');

//require routes
const index = require('./routes/index'),
      authors = require('./routes/authors'),
      categories = require('./routes/category'),
      content_types = require('./routes/content_type'),
      posts = require('./routes/posts'),
      post_details = require('./routes/post_details');

const app = express();

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/bi-steps');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'semantic')));
app.use(methodOverride("_method"));

app.use('/authors', authors);
app.use('/categories', categories);
app.use('/content_types', content_types);
app.use('/posts', posts);
app.use('/posts/:id/show/post_details', post_details);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
