// MongoDB Model & Schema
// mongoose Model은 Schema를 감싸주는 역할. DB에 interface를 제공한다.
// mongoose Schema는 document 구조, default values, validators 등을 define 한다. 

// mongoose module을 가져온다.(라이브러리에서 가져오는거라 ./ 필요 없음)
const mongoose = require('mongoose');
// 암호화 하기 위해 bcrypt 가져온다.(라이브러리에서 가져오는거라 ./ 필요 없음)
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt 생성(saltRound = 10-> 10 자리 salt) -> 비밀번호를 암호화
// json web token(라이브러리에서 가져오는거라 ./ 필요 없음)
const jwt = require('jsonwebtoken');
// schema 생성
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, // trim true-> 공백 제거
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
    token:{ // 유효성 관리
        type: String
    },
    tokenExp:{ // token 유효기간
        type: Number
    }
})

// save전에 암호화 해주기 
userSchema.pre('save', function( next ){

    var user = this;

    // 비밀번호에 변화가 있는 경우에만
    if(user.isModified('password')){
        // 비밀번호를 암호화 시킨다.
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
    } else { // 만약에 비밀번호가 아닌 다른 것을 바꿀 때는 
        next() // 들어 왔다가 바로 나간다. (어디로? index.js로?)
    }
})

// comparePassword() 메소드 생성(index.js) -> User.js 유저 모델에서 만들어야 한다.
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567 // 암호화 된 비밀번호 $2b$10$WBYPU5z5okNFIE0lViM6NOujCFqnsglpZJB3gpX1vOVZ4baUK9Qx2
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);  // false
            cb(null, isMatch)    // true
    })
}

userSchema.methods.generToken = function(cb){
    var user = this;
    // console.log('user._id', user._id);

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'hidenToken');
    // userSchema의 token 부분 필드에 넣어주기
    // user._id +'hidenToken' = token
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
            cb(null, user)
    })
}

userSchema.statics.findByToken = function( token, cb) {
    var user = this;
    // token을 decode 한다.
    jwt.verify( token, 'hidenToken', function(err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾은 다음
        // client에서 가져온 token과 DB의 token이 일치하는지 확인
        user.findOne({ "_id" : decoded, "token": token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

// 스키마를 모델로 감싸 준다.
const User = mongoose.model('User', userSchema);
// 다른 곳에서 module 사용할 수 있게 하기.
module.exports = {User}