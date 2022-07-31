// MongoDB Model & Schema
// mongoose Model은 Schema를 감싸주는 역할. DB에 interface를 제공한다.
// mongoose Schema는 document 구조, default values, validators 등을 define 한다. 

// mongoose module을 가져온다.(라이브러리에서 가져오는거라 ./ 필요 없음)
const mongoose = require('mongoose');
// create Schema 
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true }
) 

// cover schema by model
const Favorite = mongoose.model('Favorite', favoriteSchema);
// export module to make other files use module 
module.exports = { Favorite  }






