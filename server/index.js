// start point in server-side 
const express = require('express');
const app = express();
const multer = require('multer');

// get body-parser 
const bodyParser = require('body-parser');
//  get cookie-parser 
// Cookie: client, DB(MongoDB): server
const cookieParser = require('cookie-parser');

const{ auth } = require('./middleware/auth')

// models
const{ User } = require("./models/User");
const { Comment  } = require("./models/Comment");
const { Favorite } = require('./models/Favorite');
const { Like } = require('./models/Like');
const { Dislike } = require('./models/Dislike');
const { Blog } = require('./models/Blog');

const config = require('./configuration/key');

// give body-parser options: client -> analyze -> server
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/jason
app.use(bodyParser.json());
app.use(cookieParser());

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Cookie: client, DB(MongoDB): server
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected! :)')).catch(err => console.log(err))


// < ------------- Routes for Users ----------------> //
// register Route for Register/sign-up
app.post('/api/users/register', (req, res) => { // '/register' -> end point: registr
  // get the information needed from the client-side >> put them in the DB.
  const user = new User(req.body);

  // mongoDB method
  // encoding before saving > User.js
  user.save((err, userInfo) => { // call back function
    if(err) return res.json({success: false, err})
    return res.status(200).json({ // res.status(200) -> success
      success: true
    })
  }) 
})

// login route 
app.post('/api/users/login', (req, res) => {
  // 1. find requested email in DB -> User.findOne()
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "No user for the requested email address!"
      })
    } else {
      // 2. Check if the requested email has the same password (in DB): check if the plain password and the encrypted(Hashed) password are the same using Bcrypt.
      // Create comparePassword() method
      user.comparePassword(req.body.password, (err, isMatch) => { 
      // console.log('err', err);
      // console.log('isMatch', isMatch);
  
        // get method from User.js model
        if(!isMatch){
          return res.json({ loginSuccess : false, message: "Wrong Password!"})
        } else {
          // 3. password matched ->Token 
          user.generToken((err, user) => {
            if(err) return res.status(400).send(err);
              // save token in Cookie or local storage
              res.cookie("auth_reg", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id })   
          })
        }
      })
    }
    
  }) 
})


app.get('/api/users/auth', auth, (req, res) => { // auth(middleware) -> before call back function((req, res) -> if pass -> Authentication true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : ture,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  })
})

// logout route  
// find a user asked for log-out in BD -> remove a token of the user.
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


// < ------------- Routes for Favorite ----------------> //

app.post('/api/favorite/favoriteNumber', (req, res) => {

  //get favorite number from mongoDB 
  Favorite.find({ "movieId": req.body.movieId })
      .exec((err, info) => {
          if (err) return res.status(400).send(err)
          // send favorite number to client-side
          res.status(200).json({ success: true, favoriteNumber: info.length })
      })

})

app.post('/api/favorite/favorited', (req, res) => {

  // find DB if the movie is in the list
  Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
      .exec((err, info) => {
          if (err) return res.status(400).send(err)
          // send favorite number to client-side
          let result = false;
          if (info.length !== 0) {
              result = true
          }
          res.status(200).json({ success: true, favorited: result })
      })
})

app.post('/api/favorite/addToFavorite', (req, res) => {

  const favorite = new Favorite(req.body)

  favorite.save((err, doc) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true })
  })

})

app.post('/api/favorite/getFavoredMovie', (req, res) => {

  Favorite.find({ 'userFrom': req.body.userFrom })
      .exec((err, favorites) => {
          if (err) return res.status(400).send(err)
          return res.status(200).json({ success: true, favorites })
      })

})

app.post('/api/favorite/removeFromFavorite', (req, res) => {

  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
      .exec((err, result) => {
          if (err) return res.status(400).send(err)
          return res.status(200).json({ success: true })
      })

})

// < ------------- Comments ----------------> //

app.post("/api/comment/saveComment", auth, (req, res) => {

  const comment = new Comment(req.body)

  comment.save((err, comment) => {
      console.log(err)
      if (err) return res.json({ success: false, err })

      Comment.find({ '_id': comment._id })
          .populate('writer')
          .exec((err, result) => {
              if (err) return res.json({ success: false, err })
              return res.status(200).json({ success: true, result })
          })
  })
})

app.post("/api/comment/getComments", (req, res) => {

  Comment.find({ "postId": req.body.movieId })
      .populate('writer')
      .exec((err, comments) => {
          if (err) return res.status(400).send(err)
          res.status(200).json({ success: true, comments })
      })
});

// < ------------- Likes DisLikes ----------------> //

app.post("/api/like/getLikes", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId }
  } else {
      variable = { commentId: req.body.commentId }
  }

  Like.find(variable)
      .exec((err, likes) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, likes })
      })
})


app.post("/api/like/getDislikes", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId }
  } else {
      variable = { commentId: req.body.commentId }
  }

  Dislike.find(variable)
      .exec((err, dislikes) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, dislikes })
      })

})


app.post("/api/like/upLike", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
      variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  const like = new Like(variable)
  //save the like information data in MongoDB
  like.save((err, likeResult) => {
      if (err) return res.json({ success: false, err });
      //In case disLike Button is already clicked, we need to decrease the dislike by 1 
      Dislike.findOneAndDelete(variable)
          .exec((err, disLikeResult) => {
              if (err) return res.status(400).json({ success: false, err });
              res.status(200).json({ success: true })
          })
  })

})


app.post("/api/like/unLike", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
      variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  Like.findOneAndDelete(variable)
      .exec((err, result) => {
          if (err) return res.status(400).json({ success: false, err })
          res.status(200).json({ success: true })
      })

})


app.post("/api/like/unDisLike", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
      variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  Dislike.findOneAndDelete(variable)
  .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true })
  })


})



app.post("/api/like/upDisLike", (req, res) => {

  let variable = {}
  if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
      variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  const disLike = new Dislike(variable)
  //save the like information data in MongoDB
  disLike.save((err, dislikeResult) => {
      if (err) return res.json({ success: false, err });
      //In case Like Button is already clicked, we need to decrease the like by 1 
      Like.findOneAndDelete(variable)
          .exec((err, likeResult) => {
              if (err) return res.status(400).json({ success: false, err });
              res.status(200).json({ success: true })
          })
  })


})


// < ------------- Reply Comment ----------------> //

app.post("/api/comment/saveComment", auth, (req, res) => {

  const comment = new Comment(req.body)

  comment.save((err, comment) => {
      console.log(err)
      if (err) return res.json({ success: false, err })

      Comment.find({ '_id': comment._id })
          .populate('writer')
          .exec((err, result) => {
              if (err) return res.json({ success: false, err })
              return res.status(200).json({ success: true, result })
          })
  })
})

app.post("/api/comment/getComments", (req, res) => {

  Comment.find({ "postId": req.body.movieId })
      .populate('writer')
      .exec((err, comments) => {
          if (err) return res.status(400).send(err)
          res.status(200).json({ success: true, comments })
      })
});


// < ------------- Board and Post ----------------> //

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only .jpg/.png allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file");

app.post("/api/blog/uploadfiles", (req, res) => {

  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

});

app.get("/api/blog/uploadfiles", (req, res) => {

  Blog.find()
      .populate('fileName')
      .exec((err, blogs) => {
          if(err) return res.status(400).send(err);
          res.status(200).json({ success: true, blogs })
      })

});

app.get("/api/blog/getBlogs", (req, res) => {

  Blog.find()
      .populate('writer')
      .exec((err, blogs) => {
          if(err) return res.status(400).send(err);
          res.status(200).json({ success: true, blogs })
      })

});

app.post("/api/blog/uploadBlog", (req, res) => {

  const blog = new Blog(req.body);

  blog.save((err, blog) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({
          success: true 
      })
  })

});

app.post("/api/blog/getBlog", (req, res) => {

  Blog.findOne({ "_id" : req.body.blogId })
    .populate('writer')
    .exec((err, blog) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, blog })
    })
});

app.post('/api/blog/removeFromBoard', (req, res) => {

  Blog.findOneAndDelete({ writer: req.body.writer, blogId: req.body._id })
      .exec((err, result) => {
          if (err) return res.status(400).send(err)
          return res.status(200).json({ success: true })
      })

})

// < ------------- Serverside Port ----------------> //

const port = 5001

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})











