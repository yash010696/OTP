var express=require('express');
var mongodb=require('mongodb');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var localStorage=require('localstorage');


var {router}=require('./routes/route');

var app=express();
var port= process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/',router);

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});