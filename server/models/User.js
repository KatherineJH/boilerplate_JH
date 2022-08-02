// MongoDB Model & Schema >> interface in DB
// mongoose Schema defines document structures, default values, validators and so on.

// bcrypt for encrypt password
const bcrypt = require('bcrypt');
const saltRounds = 10; // create salt(saltRound = 10-> 10 digits salt) -> encrypt password

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
// create Schema 
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, // trim true-> trim spaces
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{ // administer or normal user
        type: Number,
        default: 0
    },
    image: String,
    token:{ // validation check
        type: String
    },
    tokenExp:{ // token Exp
        type: Number
    }
})

// encrypt before saving  
userSchema.pre('save', function( next ){

    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function (err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash){
                // store hash in your password DB
                if(err) return next (err) 
                // else
                user.password = hash;
                next()
            })
        })
    } else { // if change other detail, not password 
        next(); 
    }
})

// comparePassword() method to be used in index.js -> should be made in User.js(User model)
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);  // false
            cb(null, isMatch)    // true
    })
}

userSchema.methods.generToken = function(cb){
    var user = this;
    // console.log('user._id', user._id);

    // create token using jsonwebtoken
    var token = jwt.sign(user._id.toHexString(), 'hidenToken');
    // user._id +'hidenToken' = token
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
            cb(null, user)
    })
}

userSchema.statics.findByToken = function( token, cb) {
    var user = this;
    // decode token
    jwt.verify( token, 'hidenToken', function(err, decoded) {
        user.findOne({ "_id" : decoded, "token": token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

// cover schema by model
const User = mongoose.model('User', userSchema);
// export module to make other files use module 
module.exports = {User};






