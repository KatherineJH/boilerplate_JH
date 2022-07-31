
const { User } = require('../models/User');

let auth = ( req, res, next ) => {
    // doing authorization
    // 1. 클라이언트 Cookie에서 저장된 Token을 Server에 가져와서 복호화 한다.
    let token = req.cookies.auth_reg;
    // 2. 복호화 하면 User ID가 나오는데, User ID를 이용해서 유저를 찾음.
    User.findByToken(token, (err, user) => {
        // 3. 유저가 없으면 인증 no.
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        // 4. 유저가 있으면 인증 okay.
        // else -> 유저가 있다면,
        req.token = token; // token 정보를 req에 넣어주고(index.js에서 사용하려고)
        req.user = user; // user 정보를 req에 넣어주고(index.js에서 사용하려고))
        next(); // 그 다음 next.
    })

}

module.exports = { auth };