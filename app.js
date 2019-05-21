var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/api/users');
var login = require('./routes/api/login');
var ue = require('./routes/api/ue');
var category = require('./routes/api/category');
var article = require('./routes/api/article');
var blog = require('./routes/api/blog');
var advertisement = require('./routes/api/advertisement');
var pal = require('./routes/api/pal');
var comment = require('./routes/api/comment');
var manage = require('./routes/manage');
var app = express();

// var app = require('express')();
app.use("*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));

var ejs = require('ejs');

app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/ue', ue);
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/article', article);
app.use('/api/category', category);
app.use('/api/blog', blog);
app.use('/api/advertisement', advertisement);
app.use('/api/pal', pal);
app.use('/api/comment', comment);

app.get('/index', function(req, res) {
    res.render('index.html');
});
app.get('/', function(req, res) {
    res.render('index.html');
});

app.use('/manage', manage);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;