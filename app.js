const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      expressSanitizer = require('express-sanitizer'),
      cookieParser = require("cookie-parser"),
      session = require('express-session'),
      flash = require('connect-flash'),
      methodOverride = require('method-override'),
      morgan = require('morgan'),
      passport = require('passport'),
      helmet = require('helmet');
      LocalStrategy = require('passport-local');

//require models
const Author = require('./models/author'),
      Category = require('./models/category'),
      Content_Type = require('./models/content_type'),
      Post_Detail = require('./models/post_detail'),
      Post = require('./models/posts'),
      User = require('./models/user'),
      Role = require('./models/roles');

//require routes
const index = require('./routes/index'),
      authors = require('./routes/authors'),
      categories = require('./routes/category'),
      content_types = require('./routes/content_type'),
      posts = require('./routes/posts'),
      search = require('./routes/search'),
      post_details = require('./routes/post_details'),
      register = require('./routes/register'),
      roles = require('./routes/roles');

const app = express();


// Database Configuration
mongoose.Promise = require('bluebird');
const db = mongoose.connection;

var connection_string = 'mongodb://localhost/bi-steps';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
console.log('Connection String = ' + connection_string);
mongoose.connect(connection_string);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'semantic')));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// Passport Configuration
app.use(session({
    secret: 'Who is the smartest man in the world?',
    resave: false,
    saveUninitialized: false
}));

// Express Messages Middleware


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware login function
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', index);
app.use('/authors', authors);
app.use('/categories', categories);
app.use('/content_types', content_types);
app.use('/posts', posts);
app.use('/search', search);
app.use('/posts/:id/show/post_details', post_details);
app.use('/register', register);
app.use('/roles', roles);


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
