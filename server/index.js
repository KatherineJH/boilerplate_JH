// 백엔드 시작점

const express = require('express')
const app = express()

// 다운받은 body-parser 가져오기. dependencies 안에 있음.
const bodyParser = require('body-parser');
// 다운받은 cookie-parser 가져오기. 
// Cookie는 client, DB(MongoDB)는 server
const cookieParser = require('cookie-parser');
// 인증 처리 하는 거 들어있는 auth.js 가져오기
const{ auth } = require('./middleware/auth')
// 만들어 둔 User model 가져오기(models/User.js 에서)
const{ User } = require("./models/User");

const config = require('./configuration/key');

// body-parser 옵션 주기: client에서 오는 정보를, 서버에서 분석하여 가져올 수 있게 해줌.
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/jason
app.use(bodyParser.json());
app.use(cookieParser());

// Cookie는 client, DB(MongoDB)는 server
const mongoose = require('mongoose')
// 몽고DB url 주소 숨겨야 한다.(비밀 설정 정보 관리)
// mongoose.connect('mongodb+srv://KatMin:Merong1234@cluster0.noejq.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))
// 상위 comment block 안의 url은 이제 필요 없다.(숨겨야 함)
// 왜? product.js, develop.js, key.js가 있으니까. 
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

// mongodb에 들어있는 비밀 설정 정보 관리

// 간단한 route
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요? Bonjuorno?')
})

app.get('/api/hello', (req, res) => {
  res.send("21강 테스트~~")
})

// 회원 가입을 위한 register Route 만들기
app.post('/api/users/register', (req, res) => { // '/register' -> end point는 registr라는 뜻.
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body);
  
  // save전에 암호화 해주기 > User.js

  // mongoDB method
  user.save((err, userInfo) => { // call back function
    if(err) return res.json({success: false, err})
    return res.status(200).json({ // res.status(200)는 성공
      success: true
    })
  }) 
})

// login route 만들기
app.post('/api/users/login', (req, res) => {
  // 1. 요청된 email 있는지 DB에서찾기 -> User.findOne()
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    } else {
      // 2. 요청된 email이 있다면 비밀번호가 같은 지 확인(DB에서): Bcrypt를 이용, plain password와 암호화된 (Hashed) 패스워드가 같은 지 확인.
      // comparePassword() 메소드 생성
      user.comparePassword(req.body.password, (err, isMatch) => { 
      // console.log('err', err);
      // console.log('isMatch', isMatch);
  
        // 메소드를 User.js 유저 모델에서 만들어야 한다.
        if(!isMatch){
          return res.json({ loginSuccess : false, message: " 비밀번호가 틀렸습니다."})
        } else {
          // 3. 비밀번호 까지 같다면 Token을 생성.(JSONWEBTOKEN 라이브러리 다운로드 필요: npm install jsonwebtoken --save)
          user.generToken((err, user) => {
            if(err) return res.status(400).send(err);
            // token을 저장한다. 어디에? 쿠키 (or 로컬 스토리지 등)
            // cookie parser 라이브러리 설치 필요. npm install cookie-parser --save
              res.cookie("auth_reg", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id })
    
          })
        }
      })
    }
    
  }) 
})

// middleware: end point('/api/users/auth')에서 request 받은 다음에, call back function((req, res))을 하기 전에 중간에서 해주는 것.
app.get('/api/users/auth', auth, (req, res) => { // auth 라는 midware 추가
  // 여기까지 미들웨어를 통과 해서 왔다면, Authentication이 true라는 뜻.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : ture,
    // role 0 -> 일반 user, role 0이 아니면 -> admin
    // role 1 -> admin, role 2 -> 특정 부서 admin
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// logout route 만들기 
// 로그아웃 하려는 유저를 DB(서버)에서 찾고, 그 유저의 토큰을 지워준다.
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id},
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

const port = 5000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

