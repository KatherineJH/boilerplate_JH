
const { User } = require('../models/User');

let auth = ( req, res, next ) => {
    // doing authorization
    // 1. get a saved Token(from Cookie in client-side) into Server and decode.
    let token = req.cookies.auth_reg;
    // 2. decoding -> User ID coming up -> find user by User ID.
    User.findByToken(token, (err, user) => {
        // 3. no user -> no authentication
        if (err){
            throw err;
        } 
        if (!user){ 
            return res.json({ isAuth: false, error: true });
        } 
        // 4. user exsisted
        else { 
            req.token = token; // putting token info into req(to utilize in index.js)
            req.user = user; // putting user info into req(to utilize in index.js)
            next(); // and then next()
        }
    })

}

module.exports = { auth };