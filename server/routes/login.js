
var express = require('express');
var localStorage = require('localStorage');
var jwt = require('jsonwebtoken');

var router1 = express.Router();
var { User } = require('./../models/user');

router1
    .post('/signup', (req, res) => {
        User.findOne({ 'email': req.body.email }, function (err, user) {
            if (err)
                res.json("Invalid Email or Password!!!");
            if (user)
                res.json({ message: "Email Id is taken." })
            else {
                var user = new User(req.body);
                user.save().then((user) => {
                    res.json(user);
                }).catch((err) => {
                    res.json("Invalid Email or Password");
                });
            }
        })
    })

    .post('/login', (req, res) => {
        localStorage.setItem('email', JSON.stringify(req.body.email));
        User.findByCrediantials(req.body.email, req.body.password).then((user) => {

            var token = user.generateAutoToken();
            res.header('x-auth', token).send(user);
        }, (err) => {
            res.json(err);
        });
    })

    .get('/profile', (req, res) => {
        var header1 = req.header('x-auth');
        var header = localStorage.getItem('auth');
        
        // if (header == null) {
        //     res.json("You have to logged in!");
        // } else 
        if (JSON.stringify(header) === JSON.stringify(header1)) {
            var email = JSON.parse(localStorage.getItem('email'));
            User.findOne({ email }).then((user) => {
                if (!user) {
                    res.json("You have to Logged In!!");
                } else {
                    res.json(user);
                }
            });
        } else {
            res.json("You have to logged in!!!");
        }
    })

    .post('/logout', (req, res) => {
        localStorage.clear();
        res.json({ message: "Logged Out" });
    });

module.exports = { router1 };