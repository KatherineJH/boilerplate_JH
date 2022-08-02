// MongoDB Model & Schema >> interface in DB
// mongoose Schema defines document structures, default values, validators and so on.

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






