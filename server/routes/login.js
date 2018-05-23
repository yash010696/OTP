
var express = require('express');
var localStorage = require('localStorage');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;

var router1 = express.Router();
var { User } = require('./../models/user');


router1
    .post('/signup', (req, res) => {
        User.findOne({ 'email': req.body.email }, function (err, user) {
            if (err)
                res.send(err)
            if (user)
                res.json({ message: "EmailId is taken." })
            else {
                var user = new User(req.body);
                user.save().then((user) => {
                    res.json(user);
                }).catch((err) => {
                    res.send(err);
                });
            }
        })

    })

    .post('/login', (req, res) => {
        localStorage.setItem('email', JSON.stringify(req.body.email));
        User.findByCrediantials(req.body.email, req.body.password).then((user) => {

            var token = user.generateAutoToken();
            // var a = localStorage.getItem('email');
            // var b= localStorage.getItem('auth');
            // console.log("1111111111111111", a,"+",b);
            res.header('x-auth', token).send(user);
        }, (err) => {
            res.send(err);
        });
    })
    .get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))

    .get('/auth/facebook/callback', passport.authenticate('facebook'), function (req, res) {

        var header = localStorage.getItem('auth');
        res.header('x-auth', header).redirect('/user/profile');;
    })

    .get('/auth/google', passport.authenticate('google', { scope: ['email'] }))

    .get('/auth/google/callback', passport.authenticate('google'), function (req, res) {

        var header = localStorage.getItem('auth');
        res.header('x-auth', header).redirect('/user/profile');;
    })

    .get('/profile', (req, res) => {
        var header1 = req.header('x-auth');
        var header = localStorage.getItem('auth');

        // console.log('111111', header1);
        // console.log('//////', header);

        if (JSON.stringify(header) === JSON.stringify(header1)) {
            var email = JSON.parse(localStorage.getItem('email'));
            User.findOne({ email }).then((user) => {
                if (!user) {
                    res.json("You have to logged in!");
                }
                // res.json(`${user._id},${user.email}`);
                res.json({
                    _id: user._id,
                    email: user.email
                });
            });
        } else {
            var email = JSON.parse(localStorage.getItem('email'));
            User.findOne({ email }).then((user) => {
                if (!user) {
                    res.json("You have to logged in!");
                }
                // res.json(`${user._id},${user.email}`);
                res.json({
                    _id: user._id,
                    email: user.email
                });
            });

            // res.json("You have to logged in!");
        }
    })

    .post('/logout', (req, res) => {
        localStorage.clear();
        // var a=localStorage.getItem('auth');
        // console.log("1222222222222222", a);
        res.json({ message: "Logged Out" });
    });

module.exports = { router1 };