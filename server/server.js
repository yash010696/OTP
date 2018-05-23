require('./config/config.js');

var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var configAuth = require('./config/auth');
require('./config/passport')(passport);

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var localStorage = require('localstorage');
var engine = require('consolidate');
var mustache = require('mustache');


var { mongoose } = require('./db/mongoose');
var { router } = require('./routes/otp');
var { router1 } = require('./routes/login');
var { User } = require('./models/user');


var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', router1);
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});