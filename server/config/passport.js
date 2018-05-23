require('./config.js');

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy
var localStorage = require('localStorage');


var { mongoose } = require('./../db/mongoose');
var { User } = require('../models/user');
// var configAuth = require('./auth');

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use(new FacebookStrategy({
		clientID: process.env.facebookAuthClientID,
		clientSecret: process.env.facebookAuthClientSecret,
		callbackURL: process.env.facebookAuthCallbackURL,
		profileFields: ['id', 'displayName', 'gender', 'email', 'name']
	},
		function (accessToken, refreshToken, profile, done) {
			// console.log('Profile:',profile);
			process.nextTick(function () {
				User.findOne({ 'facebook.id': profile.id }, function (err, user) {
					if (err)
						return done(err);
					if (user) {
						// console.log(accessToken);
						localStorage.setItem('auth',accessToken);
						localStorage.setItem('email', JSON.stringify(profile.emails[0].value));
						return done(null, user);
					} else {
						var user = new User();
						user.facebook.id = profile.id;
						user.facebook.token = accessToken;
						user.facebook.name = profile.displayName;
						user.facebook.email = profile.emails[0].value;
						user.email = profile.emails[0].value;
						user.save(function (err) {
							if (err)
								throw err;
							localStorage.setItem('auth',accessToken);
							localStorage.setItem('email', JSON.stringify(profile.emails[0].value));
							return done(null, user);
						})
						// console.log('////////////////////////////', profile);
					}
				});

				// var fbprofile={
				// 	id : profile.id,
				// 	token : accessToken,
				// 	name : profile.name.givenName + ' ' + profile.name.familyName,
				// 	fbemail : profile.emails[0].value
				// }

				// console.log('aaaaa',fbprofile);
				// var user= fbprofile;
				//  user= new User(fbprofile);
				// console.log('aaa',user);
				// user.insertFacebook(profile,accessToken).then((user)=>{
				// 	console.log(']]]]]]]]]]]]',user);
				// 	return done(null, user)
				// },(err)=>{
				// 	return done(err);
				// })
			});
		}
	));

	passport.use(new GoogleStrategy({
		clientID: process.env.googleAuthClientID,
		clientSecret: process.env.googleAuthClientSecret,
		callbackURL: process.env.googleAuthCallbackURL,
		profileFields: ['id', 'displayName', 'gender', 'email', 'name']
	},
		function (accessToken, refreshToken, profile, done) {
			// console.log('Profile:',profile);
			process.nextTick(function () {
				User.findOne({ 'google.id': profile.id }, function (err, user) {
					if (err)
						return done(err);
					if (user) {
						// console.log(accessToken);
						localStorage.setItem('auth',accessToken);
						localStorage.setItem('email', JSON.stringify(profile.emails[0].value));
						return done(null, user);
					} else {
						var user = new User();
						user.google.id = profile.id;
						user.google.token = accessToken;
						user.google.name = profile.displayName;
						user.google.email = profile.emails[0].value;
						user.email = profile.emails[0].value;
						user.save(function (err) {
							if (err)
								throw err;
							localStorage.setItem('auth',accessToken);
							localStorage.setItem('email', JSON.stringify(profile.emails[0].value));
							return done(null, user);
						})
						// console.log('////////////////////////////', profile);
					}
				});
			});
		}
	));
};