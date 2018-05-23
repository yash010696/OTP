var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
        },
        message: `{VALUE} is not valid`
    },
    password: {
        type: String,
        // required: true,
        minlength: 6
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        name: String,
        email: String
    }
},
    { timestamps: true }
)



UserSchema.pre('save', function (next) {
    console.log('in preeeee');

    var user = this;

    if (user.isModified('password')) {
        console.log('in ifffff');

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });

    } else {
        console.log('in else');
        next();
    }
});
UserSchema.methods.generateAutoToken = function () {
    console.log('in method');
    var user = this;
    var access = "auth";
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    // user.tokens.push({ access, token });
    localStorage.setItem('auth', token);
    return token;
};

UserSchema.statics.findByCrediantials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject('invalid email');
        }

        return new Promise((resolve, reject) => {
            console.log("in promise for password");
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject('incorrect password');
                }
            })
        })
    });
}

var User = mongoose.model('User', UserSchema, collection = "yash");

module.exports = { User };