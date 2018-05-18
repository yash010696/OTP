var express = require('express');
var localStorage=require('localStorage');
var router = express.Router();
var client = require('twilio')('ACc51160f130bb9bc5bc75ff0cb5cfeb97', 'e381fbb3cc3e6d0c420e00edc1fdbe0b');

router
    // .route('/user')

    .get('/', (req, res) => {
        res.render('index.html');
    })
    .post('/user', (req, res) => {

        console.log('///////',req.body);
        let phone = req.body.phone;
        var otp = Math.floor((Math.random() * 100000) + 1);
        localStorage.setItem('otp',JSON.stringify(otp));
        client.messages.create({
            to: `+91${phone}`,
            from: '+14158959147',
            body: `Your Otp is ${otp}.`
        }, function (err, data) {
            if (err) {
                // res.status(400).json({ message: 'Invalid Phone Number' });
                res.redirect('/');
            } else {
                // res.status(200).json({ message: 'Verify The Number!', phone: phone });
                res.redirect('/');
            }
        });
    })
    .post('/verify', function (req, res) {
        var otp1 = req.body.otp;
        var otp = localStorage.getItem('otp');
        // console.log(otp);
        if (otp == otp1) {
            res.json({ message: 'Phone Number Verified' });
        } else {
            res.json({ message: 'Invalid Otp' });
        }

    });



module.exports = { router };