require('./config/config.js');

var cookieParser = require('cookie-parser');
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

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', router1);
app.use('/user', router);

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});