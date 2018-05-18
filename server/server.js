var express=require('express');
var mongodb=require('mongodb');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var localStorage=require('localstorage');
var engine = require('consolidate');
var mustache = require('mustache');

var {router}=require('./routes/route');

var app=express();
var port= process.env.PORT || 3000;


app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',router);

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});