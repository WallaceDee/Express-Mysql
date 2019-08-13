const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const users = require('./routes/api/users')
const login = require('./routes/api/login')
const ue = require('./routes/api/ue')
const category = require('./routes/api/category')
const article = require('./routes/api/article')
const blog = require('./routes/api/blog')
const advertisement = require('./routes/api/advertisement')
const comment = require('./routes/api/comment')
const manage = require('./routes/manage')
const app = express()
const ejs = require('ejs')

// var app = require('express')()
app.use('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})
// view engine setup
// app.set('views', path.join(__dirname, 'views'))

app.engine('.html', ejs.__express)
app.set('view engine', 'html') //app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//可以使用ng
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/ue', ue)
app.use('/api/users', users)
app.use('/api/login', login)
app.use('/api/article', article)
app.use('/api/category', category)
app.use('/api/blog', blog)
app.use('/api/advertisement', advertisement)
app.use('/api/comment', comment)
app.use('/manage', manage)

//前后端分离，没用Express
// app.get('/index', function(req, res) {
//     res.render('index.html')
// })
// app.get('/', function(req, res) {
//     res.render('index.html')
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app