// MongoDB Model & Schema
// mongoose Model은 Schema를 감싸주는 역할. DB에 interface를 제공한다.
// mongoose Schema는 document 구조, default values, validators 등을 define 한다. 

// mongoose module을 가져온다
const mongoose = require('mongoose');
// schema 생성
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, // trim -> 공백 제거
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

// model 생성? model로 schema 감싸기
const User = mongoose.model('User', userSchema);

// 다른 곳에서 module 사용할 수 있게 하기.
module.exports = {User}