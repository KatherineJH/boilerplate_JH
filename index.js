// 백엔드 시작점

const express = require('express')
const app = express()
const port = 5000
// 다운받은 body-parser 가져오기. dependencies 안에 있음.
const bodyParser = require('body-parser');
// 만들어 둔 User model 가져오기(models/Users.js 에서)
const{ User } = require("./models/Users");

const config = require('./configuration/key');

// body-parser 옵션 주기: client에서 오는 정보를, 서버에서 분석하여 가져올 수 있게 해줌.
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/jason
app.use(bodyParser.json());

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://KatMin:Merong1234@cluster0.noejq.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))
// 상위 comment block 안의 url은 이제 필요 없다.
// 왜? product.js, develop.js, key.js가 있으니까. 
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

// mongodb에 들어있는 비밀 설정 정보 관리

// 간단한 route
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요? Bonjuorno?')
})

// 회원 가입을 위한 register Route 만들기
app.post('/register', (req, res) => { // '/register' -> end point는 registr라는 뜻.
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body)
  // mongoDB method
  user.save((err, userInfo) => { // call back function
    if(err) return res.json({success: false, err})
    return res.status(200).json({ // res.status(200)는 성공
      success: true
    })
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

