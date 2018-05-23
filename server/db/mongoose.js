var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/STUDENT');
// mongodb://yash:yashjayeshshah1@ds229450.mlab.com:29450/yash

module.exports = { mongoose };
